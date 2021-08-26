import React from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

const Backdrop = (props) => {
  return <div onClick={props.onFinishLogin} className={classes.backdrop}></div>;
};

const ModalOverlay = (props) => {
  const modalClasses = `${classes.modal} ${props.specificModalClass}`;
  return <div className={modalClasses}>{props.children}</div>;
};

const portalElement = document.getElementById('overlays');

export const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onFinishLogin={props.onFinishAuth} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay specificModalClass={props.specificModalClass}>
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </React.Fragment>
  );
};
