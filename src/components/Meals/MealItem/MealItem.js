import React, { useContext } from 'react';

import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import CartContext from '../../../store/cart-context';

/** Props passed from AvailableMeals.js */

const MealItem = (props) => {
    /**
     * Uses the useContext method to target the cart-context.js file
     */

    // Variable to store the CartContext.js component
    const cartCtx = useContext(CartContext);

    // Helper function to render the meal price to two decimal places.
    const price = `$${props.price.toFixed(2)}`;

    // Handler function for the onAddToCart prop passed to MealItemForm,
    // Receives the amount argument validated in MealItemForm.js.
    // Calls the addItem method found in cart-context, passing all required arguments stipulated.
    const addItemToCartHandler = amount => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price,
        });
    };

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
                <MealItemForm id={props.id} onAddToCart={addItemToCartHandler} />
            </div>
        </li>
    );
};

export default MealItem;