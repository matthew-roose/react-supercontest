import React from 'react';

import { useContext, useRef } from 'react';
import { AuthContext } from '../../store/auth-context';

import classes from './LoginForm.module.css';

export const LoginForm = (props) => {
  const authCtx = useContext(AuthContext);

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  // TODO: add LoadingSpinner
  // const [isLoading, setIsLoading] = useState(false);

  const onCancelHandler = () => {
    props.onFinishAuth();
  };

  const onLoginHandler = (event) => {
    event.preventDefault();
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // setIsLoading(true);

    fetch('https://api.chadssupercontest.net/login', {
      method: 'POST',
      body: JSON.stringify({
        username: enteredUsername,
        password: enteredPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        // setIsLoading(false);
        if (response.ok) {
          return response.json();
        } else {
          // const data = await response.json();
          throw new Error('Error');
        }
      })
      .then((data) => {
        // will log out in an hour
        authCtx.login(data, new Date(new Date().getTime() + 3600000));
        props.onFinishAuth();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <form onSubmit={onLoginHandler}>
      <div className={classes.inputField}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" ref={usernameInputRef} required />
      </div>
      <div className={classes.inputField}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordInputRef} required />
      </div>
      <div className={classes.actions}>
        <button onClick={onCancelHandler} type="button">
          Cancel
        </button>
        <button>Log In</button>
      </div>
    </form>
  );
};
