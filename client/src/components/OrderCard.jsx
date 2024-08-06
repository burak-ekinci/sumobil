import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Order from "./Order";
import { jwtDecode } from "jwt-decode";
import io from "socket.io-client";
import Spinner from "./Spinner";

function OrderCard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_KEY_DB, {
      transports: ["websocket"],
    });

    socket.on("new_order", (order) => {
      setOrders((prevOrders) => [...prevOrders, order]);

      const notificationSound = document.getElementById("notificationSound");
      notificationSound.play();
    });

    // Clean up function
    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
      socket.off("new_order");
    };
  }, []);

  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      try {
        // user defining
        const token = localStorage.getItem("user");
        const user = jwtDecode(token);
        let response;

        if (user.role === "user") {
          response = await axios.post(
            import.meta.env.VITE_KEY_CONNECTION_STRING + "/order/getmyorder",
            { phone: user.phone }
          );
        } else {
          throw new Error("Authenticated error!");
        }

        if (response.data.orders) {
          setOrders(response.data.orders);
        } else {
          setOrders([]);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  if (loading) {
    return (
      <>
        <div className="d-flex justify-content-center">
          <Spinner color={"primary"} size={"spinner-border-lg"} />
        </div>
      </>
    );
  }

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
