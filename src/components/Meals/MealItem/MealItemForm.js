import React, { useRef, useState } from "react";

import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  /**
   * Uses the Input UI component, passing data through props,
   * The input prop is expected as an object.
   */

  // Handles the validity state of the form, defaulting to true.
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  // The function triggered on the form submit event
  // Stores the value of for the input ref as a string, before converting it to an integer.
  // Validates this converted value, if invalid alters the form state and returns a conditional error message.
  // If valid forwards the entered amount via the onAddToCart prop to MealItem.js, to then be passed to the cart context.
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
