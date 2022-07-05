import React, { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from './components/Cart/Cart';
import CartProvider from "./store/CartProvider";

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
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
