import { useState } from 'react';

import { LoginForm } from '../LoginForm/LoginForm';
import { Modal } from '../Modal/Modal';
import { RegisterForm } from '../RegisterForm/RegisterForm';

import classes from './AuthModal.module.css';

export const AuthModal = (props) => {
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <Modal onFinishAuth={props.onFinishAuth} specificModalClass={classes.auth}>
      <h1>{isLogin ? 'Log In' : 'Register'}</h1>
      {isLogin && <LoginForm onFinishAuth={props.onFinishAuth} />}
      {!isLogin && <RegisterForm onFinishAuth={props.onFinishAuth} />}
      <button
        type="button"
        className={classes.toggle}
        onClick={switchAuthModeHandler}
      >
        {isLogin ? 'Create new account' : 'Log in with existing account'}
      </button>
    </Modal>
  );
};
