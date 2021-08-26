import React, { useCallback, useEffect, useState } from 'react';

let logoutTimer;

export const AuthContext = React.createContext({
  loginToken: '',
  isLoggedIn: false,
  firstName: '',
  username: '',
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  return adjExpirationTime - currentTime;
};

const retrieveLocalStorage = () => {
  const storedLoginToken = localStorage.getItem('loginToken');
  const storedFirstName = localStorage.getItem('firstName');
  const storedUsername = localStorage.getItem('username');
  const storedExpirationTime = localStorage.getItem('expirationTime');
  const remainingTime = calculateRemainingTime(storedExpirationTime);

  // less than a minute left or a time in the past
  if (remainingTime < 60000) {
    localStorage.removeItem('loginToken');
    localStorage.removeItem('firstName');
    localStorage.removeItem('username');
    localStorage.removeItem('expirationTime');
    return null;
  }
  return {
    loginToken: storedLoginToken,
    firstName: storedFirstName,
    username: storedUsername,
    remainingTime: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const storedData = retrieveLocalStorage();

  let initialLoginToken;
  let initialFirstName;
  let initialUsername;

  if (storedData) {
    initialLoginToken = storedData.loginToken;
    initialFirstName = storedData.firstName;
    initialUsername = storedData.username;
  }

  // change to one object state for fewer updates?
  const [loginToken, setLoginToken] = useState(initialLoginToken);
  const [firstName, setFirstName] = useState(initialFirstName);
  const [username, setUsername] = useState(initialUsername);

  const isLoggedIn = !!loginToken;

  const logoutHandler = useCallback(() => {
    setLoginToken(null);
    setFirstName(null);
    setUsername(null);
    localStorage.removeItem('loginToken');
    localStorage.removeItem('firstName');
    localStorage.removeItem('username');
    localStorage.removeItem('expirationTime');
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    window.location.reload();
  }, []);

  const loginHandler = (data, expirationTime) => {
    setLoginToken(data.loginToken);
    setFirstName(data.firstName);
    setUsername(data.username);
    localStorage.setItem('loginToken', data.loginToken);
    localStorage.setItem('firstName', data.firstName);
    localStorage.setItem('username', data.username);
    localStorage.setItem('expirationTime', expirationTime);

    const remainingTimeInMs = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTimeInMs);
  };

  useEffect(() => {
    // reset the logout timer if an expiration time was found in storage
    if (storedData) {
      logoutTimer = setTimeout(logoutHandler, storedData.remainingTime);
    }
  }, [storedData, logoutHandler]);

  const contextValue = {
    loginToken: loginToken,
    isLoggedIn: isLoggedIn,
    firstName: firstName,
    username: username,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
