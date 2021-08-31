import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { AuthContext } from '../../store/auth-context';
import { ViewPickIndividualGame } from '../../components/ViewPickIndividualGame/ViewPickIndividualGame';

import classes from './ViewPicks.module.css';

export const ViewPicks = () => {
  const authCtx = useContext(AuthContext);

  const history = useHistory();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const weekNumberQueryParam = queryParams.get('weekNumber');

  const params = useParams();

  const [availableWeeks, setAvailableWeeks] = useState([]);
  const [picks, setPicks] = useState([]);

  let wins = 0;
  let losses = 0;
  let pushes = 0;

  useEffect(() => {
    const getAvailableWeeks = async () => {
      const response = await fetch(
        'http://localhost:8080/getAllWeekNumbersSoFar'
      );
      const data = await response.json();
      setAvailableWeeks(data);
    };
    getAvailableWeeks();

    if (!params.username || !weekNumberQueryParam) {
      return;
    }

    const getWeeklyPicks = async () => {
      const response = await fetch(
        // can look up picks from any user but they are cleaned if not logged into that user
        `http://localhost:8080/getPicks/${params.username}?weekNumber=${weekNumberQueryParam}`,
        {
          headers: {
            'Login-Token': authCtx.loginToken,
            'Content-Type': 'application/json',
          },
        }
      );
      const pickData = await response.json();
      setPicks(pickData.picks);
    };
    getWeeklyPicks();
  }, [authCtx, params.username, weekNumberQueryParam]);

  // this way you can still look at someone's picks from the leaderboard while not logged in
  if (!params.username) {
    return (
      <div className={classes.message}>Please log in to view your picks.</div>
    );
  }

  const changeFilterHandler = (event) => {
    history.push(`${location.pathname}?weekNumber=${event.target.value}`);
  };

  const selectOptions = availableWeeks.map((weekNumber) => (
    <option key={weekNumber} value={weekNumber}>
      {weekNumber}
    </option>
  ));

  // if for some reason you have /username in the URL but no weekNumber query string
  if (!weekNumberQueryParam) {
    return (
      <React.Fragment>
        <div className={classes.message}>
          Please choose a week to view picks.
        </div>
        ;
        <div className={classes.selectWeekDropdown}>
          <p>Select week: </p>
          <select onChange={changeFilterHandler}>{selectOptions}</select>
        </div>
      </React.Fragment>
    );
  }

  const pickedGameElements = picks.map((pick, index) => {
    if (pick.result === 'WIN') {
      wins++;
    } else if (pick.result === 'LOSS') {
      losses++;
    } else if (pick.result === 'PUSH') {
      pushes++;
    }
    // use index as key because pick.gameId will be null if not authenticated as this user
    return <ViewPickIndividualGame key={index} pick={pick} />;
  });

  return (
    <React.Fragment>
      <div className={classes.selectWeekDropdown}>
        <p>Select week: </p>
        <select value={weekNumberQueryParam} onChange={changeFilterHandler}>
          {selectOptions}
        </select>
      </div>

      <div className={classes.weekNumberTitle}>
        Week {weekNumberQueryParam}: {wins}-{losses}
        {pushes !== 0 ? `-${pushes}` : ''}
      </div>
      {!pickedGameElements && (
        <div className={classes.message}>No picks yet.</div>
      )}
      <div>{pickedGameElements}</div>
    </React.Fragment>
  );
};
