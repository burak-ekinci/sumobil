import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Order from "./Order";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import io from "socket.io-client";

function OrderCard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:3000", { transports: ["websocket"] });
    const notificationSound = document.getElementById("notificationSound");
    socket.on("new_order", (order) => {
      notificationSound.play();

      setOrders((prevOrders) => [...prevOrders, order]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // const notificationSound = document.getElementById("notificationSound");
    // notificationSound.play();

    const getOrders = async () => {
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
      } else if (user.role == "user") {
        try {
          const response = await axios.post(
            "http://localhost:3000/order/getmyorder",
            { phone: user.phone }
          );
          if (response.data.orders != null) {
            setOrders(response.data.orders);
          } else {
            setOrders([]);
          }
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        toast.error("Authenticated error!");
      }
    };
    getOrders();
  }, [orders]);

  return (
    <>
      {orders == [] ? (
        <div className="container bg-warning">Hiç siparişin yok!</div>
      ) : (
        orders.map((order) => <Order key={order._id} order={order} />)
      )}
    </>
  );
}

export default OrderCard;
