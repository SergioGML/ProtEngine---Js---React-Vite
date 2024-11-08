import Header from "./components/Header";
import Proteina from "./components/Proteina";
import { useCart } from "./hooks/useCart";

function App() {
  const {
    data,
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    cleanCart,
    isEmpty,
    cartTotal
  } = useCart();

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        cleanCart={cleanCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((protein) => (
            <Proteina
              key={protein.id} // Agrego aquí la key
              protein={protein}
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
