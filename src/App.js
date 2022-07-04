import React, { Fragment, useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from './components/Cart/Cart';

function App() {
  // State management function for the cart modal, defaults to false or hidden.
  const [cartIsShown, setCartIsShown] = useState(false);
  
  // Toggle cart overlay ON
  const showCartHandler = () => {
    setCartIsShown(true);
  }

  // Toggle cart overlay OFF
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <Fragment>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
