import { useEffect, useState, useMemo } from "react";
import { db } from "../data/db";

export const useCart = () => {
  const [data] = useState(db);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {
    const itemExists = cart.findIndex((protein) => protein.id === item.id);
    if (itemExists >= 0) {
      //nueva variable para no mutar el arreglo inicial
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    } else {
      item.quantity = 1;
      setCart((prevCart) => [...cart, item]);
    }
  }

  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((protein) => protein.id !== id));
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function cleanCart() {
    setCart([]); // Vacía el carrito
  }

    //State Derivado para mantener la lógica fuera del template
    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = () =>
      parseFloat(
        cart
          .reduce((total, item) => total + item.quantity * item.price, 0)
          .toFixed(2)
      );

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    cleanCart,
    isEmpty,
    cartTotal
  };
};
