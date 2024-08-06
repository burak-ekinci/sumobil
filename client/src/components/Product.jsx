import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useRef, useState } from "react";
import Spinner from "./Spinner";
import { updatePrice, updateStock } from "../hooks/updateProduct.js";
import { addCart, clearCart } from "../hooks/cart.js";
import { CartContext } from "../contexts/CartContext.jsx";

const Product = ({ product }) => {
  const { cart, setCart } = useContext(CartContext);

  const [loadingNow, setLoadingNow] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [loadingStock, setLoadingStock] = useState(false);
  const navigate = useNavigate();
  let priceRef = useRef(1);
  let stockRef = useRef(1);
  let amountRef = useRef(1);

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
    setLoadingDelete(true);
    try {
      await axios.post(
        import.meta.env.VITE_KEY_CONNECTION_STRING + "/product/deleteproduct",
        {
          _id: product._id,
        }
      );
      setLoadingDelete(false);
      navigate(0);
    } catch (error) {
      setLoadingDelete(false);
      toast.error(response.data.error);
    }
  };

  const makeOrder = async () => {
    setLoadingNow(true);
    try {
      const orderTemplate = {
        user: user.id,
        product: product._id,
        amount: amountRef.current.value,
        totalPrice: amountRef.current.value * product.price,
        status: "Beklemede",
      };
      const response = await axios.post(
        import.meta.env.VITE_KEY_CONNECTION_STRING + "/order/setorder",
        orderTemplate
      );
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      setLoadingNow(false);
      toast.success(
        response.data.message +
          amountRef.current.value +
          " tane " +
          product.name
      );
    } catch (error) {
      setLoadingNow(false);
      toast.error(error.message);
    }
  };

  const addToCart = () => {
    try {
      setLoadingCart(true);
      const orderTemplate = {
        user: user.id,
        product: product,
        amount: amountRef.current.value,
        totalPrice: amountRef.current.value * product.price,
        status: "Beklemede",
      };
      setCart([orderTemplate, ...cart]);
      toast.info("Ürün sepete eklendi:", product.name);
      setLoadingCart(false);
    } catch (error) {
      toast.error(error.message);
      setLoadingCart(false);
    }
  };

  const clearAllCart = async () => {
    try {
      setLoadingCart(true);
      await clearCart(product);
      toast.warning("Sepet temizlendi");
      setLoadingCart(false);
    } catch (error) {
      toast.error(error.message);
      setLoadingCart(false);
    }
  };

  const updatePrices = async () => {
    if (priceRef.current.value < 0) {
      toast.error("Lütfen geçerli bir fiyat girin");
      return;
      -1;
    }
    try {
      setLoadingPrice(true);
      const updateProductObj = {
        _id: product._id,
        price: priceRef.current.value,
      };
      await updatePrice(updateProductObj);
      setLoadingPrice(false);
    } catch (error) {
      toast.error(error.message);
      setLoadingPrice(false);
    }
  };

  const updateStocks = async () => {
    if (stockRef.current.value < 0) {
      toast.error("Lütfen geçerli bir stok sayısı girin");
      return;
    }
    try {
      setLoadingStock(true);
      const updateProductObj = {
        _id: product._id,
        stock: stockRef.current.value,
      };
      await updateStock(updateProductObj);
      setLoadingStock(false);
    } catch (error) {
      toast.error(error.message);
      setLoadingStock(false);
    }
  };

  return (
    <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
      <div className="card text-center">
        <div>
          {user.role == "admin" ? (
            loadingDelete ? (
              <Spinner color={"white"} size={"spinner-border-sm"} />
            ) : (
              <a
                onClick={() => {
                  setLoadingDelete(true);
                  const confirm = window.confirm(
                    product.name + " ürününü silmek istiyor musunuz?"
                  );
                  if (confirm) deleteProduct();
                  setLoadingDelete(false);
                }}
                className="float-end btn btn-outline-secondary text-decoration-none m-2"
              >
                <i className="bi bi-x-lg"></i>{" "}
              </a>
            )
          ) : null}
        </div>
        <div className="d-flex justify-content-center mt-3">
          <img
            style={{ maxWidth: "30vh" }}
            src={product.imgUrl}
            className="card-img-top"
            alt="Product Image"
          />
        </div>
        <div className="card-body">
          <h5 className="card-title mt-2 fw-normal">{product.name}</h5>
          <div className="d-flex justify-content-center mb-4 mt-2 fw-light">
            <span className="card-text d-flex align-items-center text-center fw-normal">
              {product.price} ₺
            </span>
            <div className="mx-3 border border-end"></div>
            <span className="card-text">
              {product.stock === 0 ? (
                <span className="text-danger">
                  {" "}
                  <i className="bi bi-x-circle"></i> Tükendi
                </span>
              ) : product.stock <= 10 ? (
                <span className="text-info">
                  {" "}
                  <i className="bi bi-exclamation-circle"></i> Tükeniyor
                </span>
              ) : (
                <span className="text-success">
                  {" "}
                  <i className="bi bi-check2-circle"></i> Stok
                </span>
              )}
            </span>
          </div>

          {user.role == "user" ? (
            <div className="d-flex flex-row gap-2 justify-content-center align-items-center pb-2">
              <div className="d-flex flex-column col-4 gap-2 justify-content-center align-items-center">
                <i
                  onClick={() => {
                    let amount = parseInt(amountRef.current.value);
                    amount += 1;
                    amountRef.current.value = amount;
                  }}
                  className="bi bi-chevron-up"
                ></i>
                <input
                  ref={amountRef}
                  type="number"
                  className="form-control text-center"
                  defaultValue={parseInt(1)}
                  placeholder="Adet girin"
                  style={{ width: "50%", height: "100%" }}
                />
                <i
                  onClick={() => {
                    let amount = parseInt(amountRef.current.value);
                    amount -= 1;
                    if (amount < 1) {
                      amountRef.current.value = 1;
                      return;
                    }
                    amountRef.current.value = amount;
                  }}
                  className="bi bi-chevron-down"
                ></i>
              </div>

              {/* USER ROLE ACCESS */}
              <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
                <button
                  onClick={addToCart}
                  className="btn btn-outline-secondary"
                  disabled={product.stock && product.price ? false : true}
                >
                  <i className="bi bi-cart-plus"></i> Sepete Ekle{" "}
                  {loadingCart ? (
                    <Spinner color={"white"} size={"spinner-border-sm"} />
                  ) : null}
                </button>
                <button
                  disabled={product.stock && product.price ? false : true}
                  onClick={makeOrder}
                  className="btn btn-primary"
                >
                  <i className="bi bi-check2-square"></i> Hemen İste{" "}
                  {loadingNow ? (
                    <Spinner color={"white"} size={"spinner-border-sm"} />
                  ) : null}
                </button>
              </div>
            </div>
          ) : null}

          {/* ADMIN ROLE ACCESS */}
          {user.role == "admin" ? (
            <div className="d-flex gap-2 align-items-center pb-2">
              <div className="d-flex flex-column gap-2 align-items-end">
                <input
                  ref={priceRef}
                  type="number"
                  className="form-control text-center"
                  defaultValue={product.price}
                  placeholder="Adet girin"
                  style={{ width: "70%", height: "100%" }}
                />
                <input
                  ref={stockRef}
                  type="number"
                  className="form-control text-center"
                  defaultValue={product.stock}
                  style={{ width: "70%", height: "100%" }}
                />
              </div>

              <div className="d-flex flex-column col-7 gap-2 align-items-start">
                <button
                  onClick={updatePrices}
                  className="btn btn-outline-secondary"
                >
                  <i className="bi bi-tags"></i> Fiyat Güncelle{" "}
                  {loadingPrice ? (
                    <Spinner color={"white"} size={"spinner-border-sm"} />
                  ) : null}
                </button>
                <button onClick={updateStocks} className="btn btn-primary">
                  <i className="bi bi-arrow-repeat"></i> Stok Güncelle{" "}
                  {loadingStock ? (
                    <Spinner color={"white"} size={"spinner-border-sm"} />
                  ) : null}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Product;
