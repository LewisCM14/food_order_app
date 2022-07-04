import React from "react";

import Modal from '../UI/Modal';
import classes from "./Cart.module.css";

const Cart = (props) => {
  // A helper function to map over the items located in the cart
  const cartItems = <ul className={classes['cart-items']}>{[
        { id: "c1", name: "Sushi", amount: 2, price: 12.99 },
    ].map((item) => <li>{item.name}</li>)}</ul>;
  
  /**
   * Receives the onClose prop passed from Apps.js,
   * This prop points at the hideCartHandler function found in Apps.js.
   * The Modal component requires an onClose prop,
   * in this instance that prop points at the onClose prop found in Apps.js.
   * This onClose prop triggers the hideCartHandler method.
   */

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
