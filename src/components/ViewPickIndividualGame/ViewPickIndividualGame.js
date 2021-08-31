import React from 'react';

import { ViewPickMysteryTeam } from '../ViewPickMysteryTeam/ViewPickMysteryTeam';
import { ViewPickIndividualTeam } from '../ViewPickIndividualTeam/ViewPickIndividualTeam';

import classes from './ViewPickIndividualGame.module.css';

export const ViewPickIndividualGame = (props) => {
  const {
    pickedTeam,
    homeTeam,
    awayTeam,
    homeTeamHandicap,
    gameTime,
    homeTeamScore,
    awayTeamScore,
    result,
  } = props.pick;

  const isAwayTeamPicked = pickedTeam === awayTeam;
  const isHomeTeamPicked = pickedTeam === homeTeam;

  // not logged in as this user so it should be a mystery until final
  if (!pickedTeam) {
    return (
      <React.Fragment>
        <div className={classes.game}>
          <ViewPickMysteryTeam />
          <p className={classes.at}>at</p>
          <ViewPickMysteryTeam />
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className={classes.gameTime}>
        {new Date(+gameTime).toLocaleString()}
      </div>
      <div className={classes.game}>
        <ViewPickIndividualTeam
          isPickedTeam={isAwayTeamPicked}
          teamName={awayTeam}
          teamHandicap={homeTeamHandicap * -1}
          score={awayTeamScore}
          result={isAwayTeamPicked ? result : ''}
        />
        <p className={classes.at}>at</p>
        <ViewPickIndividualTeam
          isPickedTeam={isHomeTeamPicked}
          teamName={homeTeam}
          teamHandicap={homeTeamHandicap}
          score={homeTeamScore}
          result={isHomeTeamPicked ? result : ''}
        />
      </div>
    </React.Fragment>
  );
};
