import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import Spinner from "./Spinner";
import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { removeFromCart } from "../hooks/cart";

const Cart = ({ order }) => {
  const { cart, setCart } = useContext(CartContext); // Context'ten cart ve setCart'u alıyoruz
  const [loadingCart, setLoadingCart] = useState(false);

  const removeFromCarts = (productId) => {
    setLoadingCart(true);
    setCart(cart.filter((item) => item.product._id !== productId));
    removeFromCart(order.product._id);
    setLoadingCart(false);
    toast.info("Ürün sepetten çıkarıldı: " + order.product.name);
  };
  // user defining
  const token = localStorage.getItem("user");
  const user = jwtDecode(token);

  const createdAt = new Date(order.createdAt);

  return (
    <div className="App mb-3">
      <div className="container">
        <div className="card">
          <div className="row no-gutters">
            <div className="col-md-3 g-2 d-flex align-items-center justify-content-center">
              <img
                style={{ maxWidth: "15vh" }}
                src={order.product.imgUrl}
                className="card-img"
                alt="Order Image"
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title">{order.product.name}</h5>

                <p className="card-text">
                  <strong>Adet:</strong> {order.amount}
                </p>

                <p className="card-text">
                  <strong>Ücret:</strong> {order.totalPrice} ₺
                </p>
              </div>
            </div>
            <div className="col-md-3 d-flex flex-column align-items-center justify-content-center p-3">
              <button
                onClick={() => {
                  removeFromCarts(order.product._id);
                }}
                className="btn btn-outline-secondary mt-2"
              >
                <i className="bi bi-cart-dash"></i> İptal{" "}
                {loadingCart ? (
                  <Spinner color={"white"} size={"spinner-border-sm"} />
                ) : null}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
