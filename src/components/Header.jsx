import { useMemo } from "react";
export default function Header({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  cleanCart,
}) {
  //State Derivado para mantener la lógica fuera del template

  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = () =>
    parseFloat(
      cart
        .reduce((total, item) => total + item.quantity * item.price, 0)
        .toFixed(2)
    );

  return (
    <header className="py-5 header">
      <nav className="header-top"></nav>
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="cabecera">
            <a href="index.html">
              <img
                className="img-logo"
                src="./img/logo.jpeg"
                alt="imagen logo"
              />
            </a>
            <p className="titulo">ProtEngine</p>
          </div>
          <nav className="col-md-5 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img
                className="img-fluid"
                src="./img/carrito.png"
                alt="imagen carrito"
              />

              <div id="carrito" className="bg-white p-3">
                {isEmpty ? (
                  <p className="text-center">El carrito esta vacio</p>
                ) : (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>

                      <tbody>
                        {cart.map((protein) => (
                          <tr key={protein.id}>
                            <td className="d-flex justify-content-center align-items-center">
                              <img
                                className="img-cart"
                                src={`/img/${protein.image}.jpg`}
                                alt="imagen proteina seleccionada"
                              />
                            </td>
                            <td>{protein.name}</td>
                            <td className="fw-bold">{protein.price}€</td>
                            <td className="flex align-items-start gap-4">
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => decreaseQuantity(protein.id)}
                              >
                                -
                              </button>
                              {protein.quantity}
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => increaseQuantity(protein.id)}
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                type="button"
                                onClick={() => removeFromCart(protein.id)}
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <p className="text-end">
                      Total pagar:{" "}
                      <span className="fw-bold">{cartTotal()}€</span>
                    </p>
                  </>
                )}

                <button
                  className="btn btn-dark w-100 mt-3 p-2"
                  onClick={cleanCart}
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
