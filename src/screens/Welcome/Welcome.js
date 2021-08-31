import React from 'react';

import classes from './Welcome.module.css';

export const Welcome = () => {
  return (
    <div className={classes.container}>
      <div className={classes.background}></div>
      <div className={classes.welcomeText}>
        <p>Hey brahs, welcome to my supercontest.</p>
        <p>A few things:</p>
        <p>
          New games will be posted every Wednesday. To play, make 5 picks
          against the spread every week.
        </p>
        <p>
          Passwords are definitely not handled securely so don't use your bank
          password.
        </p>
        <p>Good luck and have fun!</p>
        <p>- Chad</p>
      </div>
    </div>
  );
};
