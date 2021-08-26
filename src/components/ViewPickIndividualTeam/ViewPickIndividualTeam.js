import { AllTeamLogos } from '../../assets/AllTeamLogos';

import classes from './ViewPickIndividualTeam.module.css';

const formatTeamName = (teamNameWithUnderscores) => {
  return teamNameWithUnderscores.replaceAll('_', ' ');
};

const formatSpread = (spread) => {
  if (spread === 0) {
    return 'PK';
  }
  if (spread < 0) {
    return spread.toFixed(1);
  }
  if (spread > 0) {
    return `+${spread.toFixed(1)}`;
  }
};

export const ViewPickIndividualTeam = (props) => {
  // IF team is picked, second class can be pending, win, loss, or push
  const teamClasses = `${classes.choice} ${
    props.isPickedTeam
      ? props.result
        ? classes[props.result.toLowerCase()]
        : classes.pending
      : ''
  }`;

  return (
    <div className={teamClasses}>
      <div className={classes.logoAndSpread}>
        <img src={AllTeamLogos[props.teamName]} alt={props.teamName} />
        <div className={classes.spread}>{formatSpread(props.teamHandicap)}</div>
      </div>
      <div className={classes.score}>{props.score}</div>
      <p>{formatTeamName(props.teamName)}</p>
    </div>
  );
};
