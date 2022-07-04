import React from 'react';

import classes from './Input.module.css';

const Input = (props) => {
    /**
     * Component expects a label and input prop to be passes
     * Spread operator is used on the input propr to ensure all other data is passed
     */
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input {...props.input} />
        </div>
    );
};

export default Input;