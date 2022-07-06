import React, { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCardButton = (props) => {
  /**
   * On the click event the button element receives the showCartHandler method from Apps.js.
   * This method is forward via the onShowCart prop through Header.js. originally from Apps.js.
   * useContext allows for re-evaluation upon 'cart' change event, change handled in CartProvider.js.
   */

  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  // Helper function to collect the data stored in the cart context, found in cart-context.js.
  const cartCtx = useContext(CartContext);

   // de-structures the cart items out of the cart object for use in useEffect & numberOfItemsInCart.
   const { items } = cartCtx;

  // Reduces the array of items found in cartCtx to find the cart total
  // Starting at 0, the current number is incremented by the amount for each individual item found in the cart.
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  // if the btnIsHighlighted state returns true renders the bump class, else nothing.
  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  // effect handler for the cart button bump animation, if cart items length evaluates to 0 does nothing.
  // else once the items key of the cart object alters sets the btn highligh state to true, triggering animation
  // this state is reverted back to false after 300ms, allowing for re-fire when item key alters again.
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCardButton;
