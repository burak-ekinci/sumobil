import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Order from "./Order";
import { jwtDecode } from "jwt-decode";
import io from "socket.io-client";
import Spinner from "./Spinner";
import Accordion from "./Accordion";

function OrderAccordion() {
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

        if (user.role === "admin") {
          response = await axios.get(
            "http://localhost:3000" + "/order/getorder"
          );
        } else if (user.role === "user") {
          response = await axios.post(
            "http://localhost:3000" + "/order/getmyorder",
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
  if (orders.length == 0) {
    return (
      <div className="alert alert-secondary" role="alert">
        Hiç sipariş yok
      </div>
    );
  }

  return (
    <>
      {orders.map((order, index) => (
        <Accordion
          key={index}
          children={order.orders}
          username={order.orders[0].user.fullName}
        />
      ))}
    </>
  );
}

export default OrderAccordion;
