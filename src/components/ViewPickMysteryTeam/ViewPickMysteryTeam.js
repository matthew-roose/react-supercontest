import classes from './ViewPickMysteryTeam.module.css';

export const ViewPickMysteryTeam = () => {
  return (
    <div className={classes.choice}>
      <div className={classes.mystery}>
        <img
          src={require('../../assets/mystery_team.png').default}
          alt="mystery_team"
        />
      </div>
      <p>Mystery Team</p>
    </div>
  );
};
