import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useRef } from "react";

const Product = ({ product }) => {
  // navigate hook
  const navigate = useNavigate();

  // refs
  const amountRef = useRef();

  // user defining
  const token = localStorage.getItem("user");
  const user = jwtDecode(token);

  const deleteProduct = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/product/deleteproduct",
        { _id: product._id }
      );
      navigate(0);
    } catch (error) {
      toast.error(response.data.error);
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

  return (
    <div className="App">
      <div className="container mt-5">
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
              <button className="btn btn-success">Sipariş ver</button>
              {user.role == "admin" ? (
                <button onClick={deleteProduct} className="btn btn-danger mt-2">
                  Ürünü Sil
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
