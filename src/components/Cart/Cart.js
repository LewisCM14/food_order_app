import React, {useContext} from "react";

import Modal from '../UI/Modal';
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from '../../store/cart-context';

const Cart = (props) => {
  
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
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
