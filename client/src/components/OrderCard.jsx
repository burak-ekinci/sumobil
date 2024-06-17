import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Order from "./Order";
import { jwtDecode } from "jwt-decode";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_KEY_DB, {
  transports: ["websocket"],
});
function OrderCard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    socket.on("new_order", async (order) => {
      const notificationSound = document.getElementById("notificationSound");
      notificationSound.play();

      setOrders((prevOrders) => [...prevOrders, order]);
    });

    return () => {
      socket.disconnect();
      socket.off("new_order");
    };
  }, [orders]);

  useEffect(() => {
    const getOrders = async () => {
      // user defining
      const token = localStorage.getItem("user");
      const user = jwtDecode(token);
      if (user.role == "admin") {
        try {
          const response = await axios.get(
            import.meta.env.VITE_KEY_CONNECTION_STRING + "/order/getorder"
          );
          setOrders(response.data.orders);
        } catch (error) {
          toast.error(error.message);
        }
      } else if (user.role == "user") {
        try {
          const response = await axios.post(
            import.meta.env.VITE_KEY_CONNECTION_STRING + "/order/getmyorder",
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
