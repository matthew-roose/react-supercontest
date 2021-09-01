import React from 'react';

import { useContext, useRef } from 'react';
import { AuthContext } from '../../store/auth-context';

import classes from './RegisterForm.module.css';

export const RegisterForm = (props) => {
  const authCtx = useContext(AuthContext);

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  // TODO: add LoadingSpinner
  // const [isLoading, setIsLoading] = useState(false);

  const onCancelHandler = () => {
    props.onFinishAuth();
  };

  const onRegisterHandler = (event) => {
    event.preventDefault();

    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // setIsLoading(true);

    fetch('http://api.chadssupercontest.net:8080/register', {
      method: 'POST',
      body: JSON.stringify({
        firstName: enteredFirstName,
        lastName: enteredLastName,
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
        authCtx.login(data, new Date(new Date().getTime() + 3600000));
        props.onFinishAuth();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <form onSubmit={onRegisterHandler}>
      <div className={classes.inputGroup}>
        <div className={classes.inputField}>
          <label htmlFor="firstName">First name</label>
          <input type="text" id="firstName" ref={firstNameInputRef} required />
        </div>
        <div className={classes.inputField}>
          <label htmlFor="lastName">Last name</label>
          <input type="text" id="lastName" ref={lastNameInputRef} required />
        </div>
      </div>
      <div className={classes.inputGroup}>
        <div className={classes.inputField}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" ref={usernameInputRef} required />
        </div>
        <div className={classes.inputField}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            ref={passwordInputRef}
            required
          />
        </div>
      </div>

      <div className={classes.actions}>
        <button onClick={onCancelHandler} type="button">
          Cancel
        </button>
        <button>Register</button>
      </div>
    </form>
  );
};
