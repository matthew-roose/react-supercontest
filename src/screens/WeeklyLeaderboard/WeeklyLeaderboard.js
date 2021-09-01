import React, { useState, useEffect } from 'react';

import { Link, useHistory, useLocation } from 'react-router-dom';

import classes from './WeeklyLeaderboard.module.css';

export const WeeklyLeaderboard = () => {
  const history = useHistory();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const weekNumberQueryParam = queryParams.get('weekNumber');

  const [availableWeeks, setAvailableWeeks] = useState([]);
  const [weeklyLeaderboardData, setWeeklyLeaderboardData] = useState([]);

  useEffect(() => {
    const getAvailableWeeks = async () => {
      const response = await fetch(
        'https://api.chadssupercontest.net:8080/getAllWeekNumbersSoFar'
      );
      const data = await response.json();
      setAvailableWeeks(data);
    };
    getAvailableWeeks();

    const getWeeklyLeaderboardData = async () => {
      const response = await fetch(
        `https://api.chadssupercontest.net:8080/getWeeklyLeaderboard/${weekNumberQueryParam}`
      );
      const data = await response.json();
      setWeeklyLeaderboardData(data);
    };
    getWeeklyLeaderboardData();
  }, [weekNumberQueryParam]);

  const changeFilterHandler = (event) => {
    history.push(`${location.pathname}?weekNumber=${event.target.value}`);
  };

  const selectOptions = availableWeeks.map((weekNumber) => (
    <option key={weekNumber} value={weekNumber}>
      {weekNumber}
    </option>
  ));

  const leaderboardElements = weeklyLeaderboardData.map((player) => (
    <tr key={player.username} className={classes.leaderboardRow}>
      <td className={classes.username}>
        <Link
          to={`/viewPicks/${player.username}?weekNumber=${weekNumberQueryParam}`}
        >
          {player.username}
        </Link>
      </td>
      <td>{`${player.firstName} ${player.lastName}`}</td>
      <td>
        {player.allPicks[weekNumberQueryParam - 1].weeklyScore.toFixed(1)}
      </td>
    </tr>
  ));

  return (
    <React.Fragment>
      <div className={classes.selectWeekDropdown}>
        <p>Select week: </p>
        <select value={weekNumberQueryParam} onChange={changeFilterHandler}>
          {selectOptions}
        </select>
      </div>
      <div className={classes.weekNumberTitle}>
        Week {weekNumberQueryParam} Leaderboard
      </div>
      <table className={classes.leaderboard}>
        <thead>
          <tr className={classes.leaderboardHeader}>
            <th>Username</th>
            <th>Name</th>
            <th>Weekly score</th>
          </tr>
        </thead>
        <tbody>{leaderboardElements}</tbody>
      </table>
    </React.Fragment>
  );
};
