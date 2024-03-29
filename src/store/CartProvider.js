import React, { useReducer } from "react";
import CartContext from "./cart-context";

// The default 'cart' object.
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// The function to handle updating the 'cart' state.
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount; // stores the cart total

    // if the item being iterated over is equal to the item being passed its index is returned
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    // Collects the existing cart item if existingCartItemIndex returns truthy.
    // returns null if existingCartItemIndex doesn't match the passed item to an existing item
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    // if existingCartItem is truthy spreads the existing item into the updatedItem object
    // then updates the amount key for the existing item to be plus the passed in item.
    // The updatedItems object is then set to a new array where the existing cart items are spread in
    // Then the exiting cart items index is updated via the updatedItem object.
    // i.e. the initial cart items amount is set to the new desired value.
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // if item is not found in the cart
      updatedItems = state.items.concat(action.item); // spreads the passed item in the updatedItems object
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      // if an item is removed completely from the cart
      updatedItems = state.items.filter((item) => item.id !== action.id); // keeps items with id not equal to passed in item id
    } else {
      // spreads the existing item array into the updatedItem object with the correct amount value
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items]; // stores the original cart state
      updatedItems[existingCartItemIndex] = updatedItem; // updates the index value of the above cart state with the desired amount.
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
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
      type: "ADD",
      item: item,
    });
  };

  // Triggers the cartReducer function.
  // Sets the type/action to REMOVE and forwards the received id argument to cartReducer.
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE",
      id: id,
    });
  };

  // Clears the cart content on order submission
  const clearCartHandler = () => {
    dispatchCartAction({type: 'CLEAR'})
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
