import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

// Helper function to create the 'backdrop' section.
// Points at a onClose prop upon a click event.
const Backdrop = (props) => {
    return (
        <div className={classes.backdrop} onClick={props.onClose} />
    );
};

// Helper function to create the 'ModalOverlay' section.
const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>
                {props.children}
            </div>
        </div>
    );
};

// Stores the #overlays div found on index.html in a variable.
const portalElement = document.getElementById('overlays');

const Modal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    );
};

export default Modal;