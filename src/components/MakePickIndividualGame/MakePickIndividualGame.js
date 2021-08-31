import React from 'react';
import { MakePickIndividualTeam } from '../MakePickIndividualTeam/MakePickIndividualTeam';

import classes from './MakePickIndividualGame.module.css';

export const MakePickIndividualGame = (props) => {
  const { gameId, homeTeam, awayTeam, homeTeamHandicap, gameTime } = props.game;

  const pickTeamHandler = (pickedTeam) => {
    props.onPickTeam(
      gameId,
      pickedTeam,
      homeTeam,
      awayTeam,
      homeTeamHandicap,
      gameTime
    );
  };

  return (
    <React.Fragment>
      <div className={classes.gameTime}>
        {new Date(+gameTime).toLocaleString()}
      </div>
      <div className={classes.game}>
        <MakePickIndividualTeam
          onPickTeam={pickTeamHandler}
          teamName={awayTeam}
          teamHandicap={homeTeamHandicap * -1}
          isPickedTeam={props.pickedTeam === awayTeam}
          gameTime={+gameTime}
          expired={+gameTime < new Date().getTime()}
        />

        <p className={classes.at}>at</p>

        <MakePickIndividualTeam
          onPickTeam={pickTeamHandler}
          teamName={homeTeam}
          teamHandicap={homeTeamHandicap}
          isPickedTeam={props.pickedTeam === homeTeam}
          gameTime={+gameTime}
          expired={+gameTime < new Date().getTime()}
        />
      </div>
    </React.Fragment>
  );
};
