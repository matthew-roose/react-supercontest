import React from 'react';

import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../store/auth-context';
import { MakePickIndividualGame } from '../../components/MakePickIndividualGame/MakePickIndividualGame';

import classes from './MakePicks.module.css';

export const MakePicks = (props) => {
  const authCtx = useContext(AuthContext);

  const [weekNumber, setWeekNumber] = useState('');
  const [availableGames, setAvailableGames] = useState([]);

  const [picks, setPicks] = useState([]);

  useEffect(() => {
    const getAvailableGames = async () => {
      const response = await fetch('http://localhost:8080/getLines/1');
      const availableGameData = await response.json();
      setWeekNumber(availableGameData.weekNumber);
      setAvailableGames(availableGameData.linesOfTheWeek);
    };
    getAvailableGames();

    if (authCtx.isLoggedIn) {
      const getCurrentPicks = async () => {
        const response = await fetch(
          `http://localhost:8080/getPicks/${authCtx.username}?weekNumber=1`,
          {
            headers: {
              'Login-Token': authCtx.loginToken,
              'Content-Type': 'application/json',
            },
          }
        );
        const currentPickData = await response.json();
        setPicks(currentPickData.picks);
      };
      getCurrentPicks();
    }
  }, [authCtx]);

  const addPickHandler = (
    gameId,
    pickedTeam,
    homeTeam,
    awayTeam,
    homeTeamHandicap,
    gameTime
  ) => {
    let prevPicks = [...picks];
    // if this game was already picked, which team?
    const prevPickedGamePick = prevPicks.find((pick) => pick.gameId === gameId);
    // game wasn't already picked
    if (!prevPickedGamePick) {
      if (prevPicks.length < 5) {
        setPicks([
          ...prevPicks,
          {
            gameId,
            pickedTeam,
            homeTeam,
            awayTeam,
            homeTeamHandicap,
            gameTime,
          },
        ]);
      } else {
        // 5 picks already made
        return;
      }
    } else {
      // game WAS already picked
      // whether switching teams or just removing the pick, need to remove original pick for game
      prevPicks = prevPicks.filter((pick) => pick.gameId !== gameId);
      // need to add the other team
      if (prevPickedGamePick.pickedTeam !== pickedTeam) {
        setPicks([
          ...prevPicks,
          {
            gameId,
            pickedTeam,
            homeTeam,
            awayTeam,
            homeTeamHandicap,
            gameTime,
          },
        ]);
      } else {
        // need to set picks state with this game filtered out
        setPicks(prevPicks);
      }
    }
  };

  const submitPicksHandler = () => {
    fetch('http://localhost:8080/submitPicks', {
      method: 'POST',
      body: JSON.stringify({
        weekNumber: weekNumber,
        picks: picks,
      }),
      headers: {
        'Login-Token': authCtx.loginToken,
        'Content-Type': 'application/json',
      },
    });
  };

  const availableGameElements = availableGames.map((game) => {
    let pickedTeam;
    // was this game picked?
    const pickedGame = picks.find((pick) => pick.gameId === game.gameId);
    if (pickedGame) {
      pickedTeam = pickedGame.pickedTeam;
    }
    return (
      <MakePickIndividualGame
        key={game.gameId}
        onPickTeam={addPickHandler}
        pickedTeam={pickedTeam}
        game={game}
      />
    );
  });

  return (
    <React.Fragment>
      <div className={classes.weekNumberTitle}>Week {weekNumber}</div>
      <div>{availableGameElements}</div>
      <button onClick={submitPicksHandler}>Submit picks</button>
    </React.Fragment>
  );
};
