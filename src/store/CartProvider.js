import React, { useReducer } from 'react';
import CartContext from './cart-context';

const CartProvider = (props) => {
    /**
     * Handles the change event for data stored in the cart-context.js file.
     */

    const addItemToCartHandler = item => {

    };

    const removeItemFromCartHandler = id => {

    };

    const cartContext = {
        items: [],
        totalAmount: 0,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    };
    
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;