import { AllTeamLogos } from '../../assets/AllTeamLogos';

import classes from './MakePickIndividualTeam.module.css';

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

export const MakePickIndividualTeam = (props) => {
  const pickTeamHandler = () => {
    props.onPickTeam(props.teamName);
  };

  const teamClasses = `${classes.choice} ${
    props.isPickedTeam ? classes.pickedTeam : ''
  }`;

  return (
    <div onClick={pickTeamHandler} className={teamClasses}>
      <div className={classes.logoAndSpread}>
        <img src={AllTeamLogos[props.teamName]} alt={props.teamName} />
        <div className={classes.spread}>{formatSpread(props.teamHandicap)}</div>
      </div>
      <p>{formatTeamName(props.teamName)}</p>
    </div>
  );
};
