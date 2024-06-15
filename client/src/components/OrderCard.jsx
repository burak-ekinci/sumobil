import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Order from "./Order";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function OrderCard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      // user defining
      const token = localStorage.getItem("user");
      const user = jwtDecode(token);
      if (user.role == "admin") {
        try {
          const response = await axios.get(
            "http://localhost:3000/order/getorder"
          );
          setOrders(response.data.orders);
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        try {
          const response = await axios.post(
            "http://localhost:3000/order/getmyorder",
            { _id: user._id }
          );
          if (response.data.orders != null) {
            setOrders(response.data.orders);
          } else {
            setOrders([]);
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    };
    getProducts();
  }, []);

  return (
    <>
      {orders == [] ? (
        <div>Hiç siparişin yok!</div>
      ) : (
        orders.map((order) => <Order key={order._id} order={order} />)
      )}
    </>
  );
}

export default OrderCard;
