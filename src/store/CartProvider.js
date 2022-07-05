import React, { useReducer } from "react";
import CartContext from "./cart-context";

// The default 'cart' object.
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// The function to handle updating the 'cart' state.
const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedItems = state.items.concat(action.item); // an array to store the items in the cart
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount; // stores the cart total
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  /**
   * Handles the change event for data stored in the cart-context.js file.
   */

  // Stores the 'cart' state and handles updating it within the cartReducer function via dispatchCartAction.
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  // Triggers the cartReducer function.
  // Sets the type/action to ADD and forwards the received item argument to cartReducer.
  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: 'ADD',
      item: item,
    });
  };

  // Triggers the cartReducer function.
  // Sets the type/action to REMOVE and forwards the received id argument to cartReducer.
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({
      type: 'REMOVE',
      id: id,
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
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
