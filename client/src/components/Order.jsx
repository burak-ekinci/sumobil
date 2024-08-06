import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import Spinner from "./Spinner";
import { useState } from "react";

const Order = ({ order }) => {
  const [loading, setLoading] = useState(false);

  // navigate hook
  const navigate = useNavigate();

  // user defining
  const token = localStorage.getItem("user");
  const user = jwtDecode(token);

  const deleteOrder = async () => {
    setLoading(true);
    const alrt = window.confirm(
      user.role == "user"
        ? "Siparişi iptal etmek istediğinizden emin misiniz?"
        : "Listeden çıkarmak istediğinize emin misiniz?"
    );
    if (alrt) {
      try {
        await axios.post(
          import.meta.env.VITE_KEY_CONNECTION_STRING + "/order/deleteorder",
          {
            _id: order._id,
          }
        );
        setLoading(false);
        navigate(0);
      } catch (error) {
        setLoading(false);
        toast.error(response.data.error);
      }
    }
    setLoading(false);
  };

  const createdAt = new Date(order.createdAt);
  return (
    <div className="App mb-3">
      <div className="container">
        <div className="card">
          <div className="row no-gutters">
            <div className="col-md-3 d-flex align-items-center justify-content-center">
              <img
                style={{ maxWidth: "30vh" }}
                src={order.product.imgUrl}
                className="card-img"
                alt="Order Image"
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
                  <strong>Adet:</strong> {order.amount}
                </p>
                <p className="card-text">
                  <strong>Adres:</strong> {order.user.address}
                </p>
                <p className="card-text">
                  <strong>Ücret:</strong> {order.totalPrice} ₺
                </p>
                <p className="card-text">
                  <strong>Sipariş zamanı:</strong> {createdAt.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="col-md-3 d-flex flex-column align-items-center justify-content-center p-3">
              <button
                onClick={() => {
                  deleteOrder();
                }}
                className="btn btn-success mt-2"
              >
                {user.role == "admin" ? (
                  <div>
                    BİTİR{" "}
                    {loading ? (
                      <Spinner color={"white"} size={"spinner-border-sm"} />
                    ) : null}
                  </div>
                ) : (
                  <div>
                    İPTAL{" "}
                    {loading ? (
                      <Spinner color={"white"} size={"spinner-border-sm"} />
                    ) : null}
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
