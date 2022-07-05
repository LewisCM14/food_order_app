import React from 'react';

import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
    /**
     * Component expects a label and input prop to be passes
     * Spread operator is used on the input propr to ensure all other data is passed
     * Wrapped in forwardRef to allow for ref's to be used on the input field,
     * Required for the component usage in MealItemForm.
     */
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} {...props.input} />
        </div>
    );
});

export default Input;