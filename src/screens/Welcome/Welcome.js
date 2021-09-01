import React, { useContext } from 'react';

import { AuthContext } from '../../store/auth-context';

import classes from './Welcome.module.css';

export const Welcome = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className={classes.container}>
      <div className={classes.background}></div>
      <div className={classes.welcomeText}>
        <p>
          Hey {authCtx.firstName ? authCtx.firstName : 'anon'}, welcome to my
          Supercontest.
        </p>
        <p> To play, make 5 picks against the spread every week.</p>
        <p>
          Passwords are definitely not stored securely so don't give me your
          bank password.
        </p>
        <p>Good luck and have fun!</p>
        <p>- Chad</p>
      </div>
    </div>
  );
};
