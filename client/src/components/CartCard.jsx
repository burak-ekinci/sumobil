import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Product from "./Product";
import Spinner from "./Spinner";
import Cart from "./Cart";

function CartCard({ carts }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  if (loading) {
    return (
      <>
        <div className="d-flex justify-content-center">
          <Spinner color={"primary"} size={"spinner-border-lg"} />
        </div>
      </>
    );
  }
  if (carts.length == 0) {
    return (
      <>
        <div className="alert alert-secondary" role="alert">
          Sepette hiç ürün yok
        </div>
      </>
    );
  }

  return (
    <>
      {carts.map((cart, index) => (
        <Cart key={index} order={cart} />
      ))}
    </>
  );
}

export default CartCard;
