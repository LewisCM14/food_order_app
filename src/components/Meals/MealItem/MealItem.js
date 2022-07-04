import React from 'react';

import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';

/** Props passed from AvailableMeals.js */

const MealItem = (props) => {

    // Helper function to render the meal price to two decimal places.
    const price = `$${props.price.toFixed(2)}`;

    return (
        <li className={classes.meal}>
            <div>
                <h3>
                    {props.name}
                </h3>
                <div className={classes.description}>
                    {props.description}
                </div>
                <div className={classes.price}>
                    {price}
                </div>
            </div>
            <div>
                <MealItemForm id={props.id} />
            </div>
        </li>
    );
};

export default MealItem;