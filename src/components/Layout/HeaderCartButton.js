import React from "react";

import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCardButton = (props) => {
  /**
   * On the click event the button element receives the showCartHandler method from Apps.js.
   * This method is forward via the onShowCart prop through Header.js. originally from Apps.js.
   */
  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>3</span>
    </button>
  );
};

export default HeaderCardButton;
