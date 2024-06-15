import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import Spinner from "./Spinner";

const Product = ({ product }) => {
  const [loading, setLoading] = useState(false);
  // navigate hook
  const navigate = useNavigate();

  // refs
  const amountRef = useRef();
  // Auth Context
  useEffect(() => {
    const checkLogin = () => {
      const jwt = localStorage.getItem("user");
      const token = jwtDecode(jwt);
      if (token == null) {
        toast.error("Bu alana erişebilmeniz için önce giriş yapmalısınız!");
        navigate("/login");
      }
    };
    checkLogin();
  });

  const token = localStorage.getItem("user");
  const user = jwtDecode(token);

  const deleteProduct = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/product/deleteproduct", {
        _id: product._id,
      });
      setLoading(false);
      navigate(0);
    } catch (error) {
      setLoading(false);
      toast.error(response.data.error);
    }
  };

  const makeOrder = async () => {
    setLoading(true);
    try {
      const orderTemplate = {
        user: user.id,
        product: product._id,
        amount: amountRef.current.value,
        totalPrice: amountRef.current.value * product.price,
        status: "Beklemede", // Enum değerlerinden biri olmalı
      };
      const response = await axios.post(
        "http://localhost:3000/order/setorder",
        orderTemplate
      );
      setLoading(false);
      toast.success(
        response.data.message +
          amountRef.current.value +
          " tane " +
          product.name
      );
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="App mb-3">
      <div className="container">
        <div className="card">
          <div className="row no-gutters">
            <div className="col-md-3 d-flex align-items-center justify-content-center">
              <img
                style={{ maxWidth: "20vh" }}
                src={product.imgUrl}
                className="card-img"
                alt="Product Image"
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  <strong>Fiyat:</strong> {product.price} ₺
                </p>
                <p className="card-text">
                  <strong>Stok:</strong> Stokta
                </p>
              </div>
            </div>
            <div className="col-md-3 d-flex flex-column align-items-center justify-content-center p-3">
              <label> Adet: </label>
              <input
                ref={amountRef}
                type="number"
                className="form-control mb-2"
                defaultValue={1}
                placeholder="Adet girin"
                style={{ width: "50%" }}
              />
              <button onClick={makeOrder} className="btn btn-success">
                Sipariş ver{" "}
                {loading ? (
                  <Spinner color={"white"} size={"spinner-border-sm"} />
                ) : null}
              </button>
              {user.role == "admin" ? (
                <button
                  onClick={() => {
                    const confirm = window.confirm(
                      product.name + " ürününü silmek siliyorsun"
                    );
                    if (confirm) deleteProduct();
                  }}
                  className="btn btn-danger mt-2"
                >
                  Ürünü Sil{" "}
                  {loading ? (
                    <Spinner color={"white"} size={"spinner-border-sm"} />
                  ) : null}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
