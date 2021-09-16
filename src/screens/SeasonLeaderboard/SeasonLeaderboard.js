import React, { useEffect, useState } from 'react';

import classes from './SeasonLeaderboard.module.css';

export const SeasonLeaderboard = () => {
  const [seasonLeaderboardData, setSeasonLeaderboardData] = useState([]);

  useEffect(() => {
    const getSeasonLeaderboardData = async () => {
      const response = await fetch(
        'https://api.chadssupercontest.net/getSeasonLeaderboard'
      );
      const data = await response.json();
      setSeasonLeaderboardData(data);
    };
    getSeasonLeaderboardData();
  }, []);

  const leaderboardElements = seasonLeaderboardData.map((player) => {
    const wins = player.seasonWins;
    const losses = player.seasonLosses;
    const pushes = player.seasonPushes;
    const winPct = ((wins / (wins + losses)) * 100).toFixed(2);
    return (
      <tr key={player.username} className={classes.leaderboardRow}>
        <td className={classes.username}>{player.username}</td>
        <td>{`${player.firstName} ${player.lastName}`}</td>
        <td>{`${wins}-${losses}${pushes > 0 ? `-${pushes}` : ''}`}</td>
        <td>{winPct ? `${winPct}%` : ''}</td>
        <td>{player.seasonScore.toFixed(1)}</td>
      </tr>
    );
  });

  return (
    <React.Fragment>
      <div className={classes.leaderboardTitle}>Season Leaderboard</div>
      <table className={classes.leaderboard}>
        <thead>
          <tr className={classes.leaderboardHeader}>
            <th>Username</th>
            <th>Name</th>
            <th>Record</th>
            <th>Win Pct.</th>
            <th>Season score</th>
          </tr>
        </thead>
        <tbody>{leaderboardElements}</tbody>
      </table>
    </React.Fragment>
  );
};
