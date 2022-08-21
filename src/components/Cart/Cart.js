import React, { useContext, useState } from "react";

import Modal from '../UI/Modal';
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from '../../store/cart-context';
import Checkout from "./Checkout";

const Cart = (props) => {
  // cart checkout state
  const [isCheckout, setIsCheckout] = useState(false);
  
  // Stores the data from the CartContext component in a object
  const cartCtx = useContext(CartContext);

  // Targets the totalAmount key in the cartCtx object,
  // storing it in a variable to return in the JSX code.
  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;

  // Targets the cartCtx items object, checking its length to validate the 'carts' content.
  // If 'true' the order button is displayed in the JSX code.
  const hasItems = cartCtx.items.length > 0;

  // Function to remove items from the cart, passed to CartItem.js in the onRemove prop.
  // id argument is bound in the prop pointer. calls the removeItem object found in cart-context.js
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  // Function to add items to the cart, passed to CartItem.js in the onAdd prop.
  // item argument is bound in the prop pointer. calls the addItem object found in cart-context.js
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1});
  };

  // function to trigger the Checkout.js form display, points at the isCheckout state above
const orderHandler = () => {
    setIsCheckout(true);
};

  // A helper function to map over the items located in the cart
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  // modal content, requires an onClose prop,
  // in this instance that prop points at the onClose prop found in Apps.js.
  // This onClose prop triggers the hideCartHandler method.
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  
  /**
   * core checkout modal
   * uses the isCheckout state above to dynamically render
   * Checkout.js receives the onClose prop from App.js,
   * which points at the hideCartHandler function.
   */

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onClose} />}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
