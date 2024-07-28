import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import Spinner from "./Spinner";

const Product = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const amountRef = useRef();

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
      await axios.post(
        import.meta.env.VITE_KEY_CONNECTION_STRING + "/product/deleteproduct",
        {
          _id: product._id,
        }
      );
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
        status: "Beklemede",
      };
      const response = await axios.post(
        import.meta.env.VITE_KEY_CONNECTION_STRING + "/order/setorder",
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
    <div className="col-sm-12 col-md-6 col-lg-4 mb-3">
      <div className="card text-center">
        <div className="d-flex justify-content-center mt-3">
          <img
            style={{ maxWidth: "30vh" }}
            src={product.imgUrl}
            className="card-img-top"
            alt="Product Image"
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <div className="d-flex justify-content-center mb-4 mt-2 fw-light">
            <span className="card-text d-flex align-items-center text-center">
              ₺{product.price}
            </span>
            <div className="mx-3 text-secondary border border-end"></div>
            <span className="card-text">Stokta</span>
          </div>
          <div className="mb-3">
            <div className="row">
              <div className="col-4 d-flex justify-content-center align-items-center px-1">
                <input
                  ref={amountRef}
                  type="number"
                  className="form-control text-center"
                  defaultValue={1}
                  placeholder="Adet girin"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div className="col justify-content-center align-items-center m-0">
                <button
                  onClick={makeOrder}
                  className="btn btn-outline-secondary mb-2"
                >
                  <i class="bi bi-cart-plus"></i> Sepete Ekle{" "}
                  {loading ? (
                    <Spinner color={"white"} size={"spinner-border-sm"} />
                  ) : null}
                </button>
                <button onClick={makeOrder} className="btn btn-primary">
                  <i class="bi bi-check2-square"></i> Hemen İste{" "}
                  {loading ? (
                    <Spinner color={"white"} size={"spinner-border-sm"} />
                  ) : null}
                </button>
              </div>
            </div>
          </div>

          <div>
            {user.role == "admin" ? (
              <a
                onClick={() => {
                  const confirm = window.confirm(
                    product.name + " ürününü silmek istiyor musunuz?"
                  );
                  if (confirm) deleteProduct();
                }}
                className="float-end text-secondary text-decoration-none mt-2 fw-light"
              >
                Ürünü Sil{" "}
                {loading ? (
                  <Spinner color={"white"} size={"spinner-border-sm"} />
                ) : null}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
