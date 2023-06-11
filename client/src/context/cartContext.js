import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [Cart, setCart] = useState([]);


  useEffect(()=>{
    let existingItems =  localStorage.getItem('cart');
    if (existingItems) {
      setCart(JSON.parse(existingItems))
    }
  },[])

  return (
    <CartContext.Provider value={[Cart,setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart  = () => useContext(CartContext);

export { useCart , CartProvider };
