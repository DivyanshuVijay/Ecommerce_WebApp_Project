import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  //now it becomes global we can access it anywhere
  const [cart, setCart] = useState([]); //initially empty array of products

  useEffect(() => {
    let exisitingCartItems = localStorage.getItem("cart"); //getting item from local storage
    if (exisitingCartItems) setCart(JSON.parse(exisitingCartItems));
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

//custom hook-> we can use this anywhere
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
