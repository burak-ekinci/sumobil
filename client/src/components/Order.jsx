import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useRef } from "react";

const Order = ({ order }) => {
  // navigate hook
  const navigate = useNavigate();

  // user defining
  const token = localStorage.getItem("user");
  const user = jwtDecode(token);

  const deleteOrder = async () => {
    const alrt = window.confirm("Sipariş teslim edildi mi?");
    if (alrt) {
      try {
        const response = await axios.post(
          "http://localhost:3000/order/deleteorder",
          { _id: order._id }
        );
        navigate(0);
      } catch (error) {
        toast.error(response.data.error);
      }
    }
  };

  const makeOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/order/setorder",
        {
          user: user._id,
          product: product._id,
          amount: amountRef.current.value,
          totalPrice: amountRef.current.value * product.price,
          status: "Beklemede", // Enum değerlerinden biri olmalı
        }
      );
      toast.success(
        "Siparişiniz alındı: " +
          amountRef.current.value +
          " tane" +
          product.name
      );
    } catch (error) {
      toast.error(response.data.error);
    }
  };
  const createdAt = new Date(order.createdAt);
  return (
    <div className="App">
      <div className="container mt-5">
        <div className="card">
          <div className="row no-gutters">
            <div className="col-md-3 d-flex align-items-center justify-content-center">
              <img
                style={{ maxWidth: "20vh" }}
                src={order.product.imgUrl}
                className="card-img"
                alt="Product Image"
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title">{order.product.name}</h5>
                <p className="card-text">
                  <strong>Müşteri İsim:</strong> {order.user.fullName}
                </p>
                <p className="card-text">
                  <strong>Müşteri Telefon:</strong> {order.user.phone}
                </p>
                <p className="card-text">
                  <strong>Adres:</strong> {order.user.address}
                </p>
                <p className="card-text">
                  <strong>Ücret:</strong> {order.product.price} ₺
                </p>
                <p className="card-text">
                  <strong>Sipariş zamanı:</strong> {createdAt.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="col-md-3 d-flex flex-column align-items-center justify-content-center p-3">
              {/* <button onClick={deleteOrder} className="btn btn-secondary mt-2">
                Sipariş İptal
              </button> */}

              {user.role == "admin" ? (
                <button
                  onClick={() => {
                    deleteOrder();
                  }}
                  className="btn btn-success mt-2"
                >
                  Teslim Edildi
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
