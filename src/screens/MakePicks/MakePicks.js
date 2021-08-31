import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../store/auth-context';
import { MakePickIndividualGame } from '../../components/MakePickIndividualGame/MakePickIndividualGame';

import classes from './MakePicks.module.css';

export const MakePicks = () => {
  const authCtx = useContext(AuthContext);

  const [currentWeekNumber, setCurrentWeekNumber] = useState();
  const [availableGames, setAvailableGames] = useState([]);

  // previously submitted picks used only for validation (an existing pick can be expired when submitting)
  const [prevSubmittedPicks, setPrevSubmittedPicks] = useState([]);
  const [picks, setPicks] = useState([]);

  useEffect(() => {
    const getCurrentWeekNumber = async () => {
      const response = await fetch(
        'http://localhost:8080/getCurrentWeekNumber'
      );
      const data = await response.json();
      setCurrentWeekNumber(data);
    };
    getCurrentWeekNumber();
  }, []);

  useEffect(() => {
    if (!currentWeekNumber) {
      return;
    }

    const getAvailableGames = async () => {
      const response = await fetch(
        `http://localhost:8080/getLines/${currentWeekNumber}`
      );
      const availableGameData = await response.json();
      setAvailableGames(availableGameData.linesOfTheWeek);
    };
    getAvailableGames();

    if (authCtx.isLoggedIn && authCtx.username) {
      const getPrevSubmittedPicks = async () => {
        const response = await fetch(
          `http://localhost:8080/getPicks/${authCtx.username}?weekNumber=${currentWeekNumber}`,
          {
            headers: {
              'Login-Token': authCtx.loginToken,
              'Content-Type': 'application/json',
            },
          }
        );
        const currentPickData = await response.json();
        setPrevSubmittedPicks(currentPickData.picks);
        setPicks(currentPickData.picks);
      };
      getPrevSubmittedPicks();
    }
  }, [authCtx, currentWeekNumber]);

  const addPickHandler = (
    gameId,
    pickedTeam,
    homeTeam,
    awayTeam,
    homeTeamHandicap,
    gameTime
  ) => {
    let currentPicks = [...picks];
    // was this game previously picked?
    const prevPickedGamePick = currentPicks.find(
      (pick) => pick.gameId === gameId
    );
    // game wasn't already picked
    if (!prevPickedGamePick) {
      if (currentPicks.length < 5) {
        setPicks([
          ...currentPicks,
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
      currentPicks = currentPicks.filter((pick) => pick.gameId !== gameId);
      // need to add new team if the other team was picked
      if (prevPickedGamePick.pickedTeam !== pickedTeam) {
        setPicks([
          ...currentPicks,
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
        setPicks(currentPicks);
      }
    }
  };

  const submitPicksHandler = () => {
    // only want to check the picks that weren't in the GET call when loading the page
    const newPicks = picks.filter(
      (pick) =>
        !prevSubmittedPicks.find((prevPick) => prevPick.gameId === pick.gameId)
    );
    const expiredPicks = newPicks.filter(
      (pick) => +pick.gameTime < new Date().getTime()
    );
    // make sure that previously submitted picks that have started are still there
    const missingPicks = prevSubmittedPicks.filter(
      (prevPick) => !picks.find((pick) => pick.gameId === prevPick.gameId)
    );
    const missingExpiredPicks = missingPicks.filter(
      (pick) => +pick.gameTime < new Date().getTime()
    );

    // logic also exists in MakePickIndividualTeam that should prevent this but there could be a case where someone loaded the page seconds before lock time
    if (expiredPicks.length > 0 || missingExpiredPicks.length > 0) {
      alert('One or more games have already started.');
      return;
    }
    fetch('http://localhost:8080/submitPicks', {
      method: 'POST',
      body: JSON.stringify({
        weekNumber: currentWeekNumber,
        picks: picks,
      }),
      headers: {
        'Login-Token': authCtx.loginToken,
        'Content-Type': 'application/json',
      },
    }).then(() => setPrevSubmittedPicks(picks)); // if someone submits picks but doesn't refresh the page, they would be able to overwrite that pick after the game started
  };

  // when getCurrentWeekNumber useEffect hasn't completed in time
  if (!availableGames) {
    return;
  }

  if (!authCtx.isLoggedIn) {
    return (
      <div className={classes.notLoggedIn}>Please log in to make picks.</div>
    );
  }

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
      <div className={classes.weekNumberTitle}>Week {currentWeekNumber}</div>
      <div>{availableGameElements}</div>
      <button className={classes.submitButton} onClick={submitPicksHandler}>
        Submit picks
      </button>
    </React.Fragment>
  );
};
