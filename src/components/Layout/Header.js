import React, { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";

const Header = (props) => {
  /**
   * HeaderCartButton receives the onShowCart prop from Apps.js
   * This prop points at the showCartHandler function within Apps.js
   */

  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table set with food" />
      </div>
    </Fragment>
  );
};

export default Header;
