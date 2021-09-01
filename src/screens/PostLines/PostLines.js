import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../store/auth-context';

import classes from './PostLines.module.css';

export const PostLines = () => {
  const authCtx = useContext(AuthContext);

  const [isAdmin, setIsAdmin] = useState(false);
  // see Postman for format
  // const [linesToPost, setLinesToPost] = useState([]);

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

  // add useEffect for privileged stuff if necessary

  if (!isAdmin) {
    return (
      <div className={classes.notAdmin}>Only admins can access this page.</div>
    );
  }

  // return components
  return <div>Post Lines</div>;
};
