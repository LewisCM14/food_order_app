import React, { useContext } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCardButton = (props) => {
  /**
   * On the click event the button element receives the showCartHandler method from Apps.js.
   * This method is forward via the onShowCart prop through Header.js. originally from Apps.js.
   * useContext allows for re-evaluation upon 'cart' change event, change handled in CartProvider.js.
   */

  // Helper function to collect the data stored in the cart context, found in cart-context.js.
  const cartCtx = useContext(CartContext);

  // Reduces the array of items found in cartCtx to find the cart total
  // Starting at 0, the current number is incremented by the amount for each individual item found in the cart.
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCardButton;
