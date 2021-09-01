import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../store/auth-context';

import classes from './ScoreGames.module.css';

export const ScoreGames = () => {
  const authCtx = useContext(AuthContext);

  const [isAdmin, setIsAdmin] = useState(false);
  // see Postman for format
  // const [scoresToUpload, setScoresToUpload] = useState([]);

  useEffect(() => {
    const checkIsAdmin = async () => {
      const response = await fetch(
        'http://api.chadssupercontest.net:8080/admin/authenticate',
        {
          headers: {
            'Login-Token': authCtx.loginToken,
            'Content-Type': 'application/json',
          },
        }
      );
      const isAdminData = await response.json();
      setIsAdmin(isAdminData);
    };
    checkIsAdmin();
  }, [authCtx]);

  // add useEffect for privileged stuff (fetch current games and their scores to use as defaults)

  if (!isAdmin) {
    return (
      <div className={classes.notAdmin}>Only admins can access this page.</div>
    );
  }

  return <div>Score Games</div>;
};
