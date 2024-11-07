import { useEffect, useState } from "react";
import Header from "./components/Header";
import Proteina from "./components/Proteina";
import { db } from "./data/db";

function App() {
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

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        cleanCart={cleanCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((protein) => (
            <Proteina
              key={protein.id} // Agrego aquí la key
              protein={protein}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <footer className="mt-5">
        <div className="container-xl">
          <div className="row justify-content-center justify-content-md-between align-items-center">
            <div className="col-md-4 text-center text-md-start">
              <p className="m-0">
                © 2024 ProtEngine. Todos los derechos reservados.
              </p>
            </div>
            <div className="col-md-4 text-center">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                className="me-3"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                className="me-3"
              >
                Facebook
              </a>
              <a href="https://www.twitter.com/" target="_blank">
                Twitter
              </a>
            </div>
            <div className="col-md-4 text-center text-md-end">
              <p className="m-0">Desarrollado por Sergio García</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
