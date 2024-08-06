import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import Order from "../components/Order";
import Cart from "../components/Cart";
import { clearCart, orderAllCart } from "../hooks/cart";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import CartCard from "../components/CartCard";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";

function MainPageLayout({ children }) {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingCartOrder, setLoadingCartOrder] = useState(false);

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

  // Sepet verileri değiştiğinde localStorage'ı güncelliyoruz
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const token = localStorage.getItem("user");
  const user = jwtDecode(token);

  const logout = () => {
    localStorage.removeItem("user");
    toast.success("Başarı ile çıkış yapıldı");
    navigate("/");
  };

  const clearAllCart = async () => {
    try {
      setLoadingCart(true);
      clearCart();
      setCart([]);
      setLoadingCart(false);
    } catch (error) {
      toast.error(error.message);
      setLoadingCart(false);
    }
  };

  const orderCart = async () => {
    setLoadingCartOrder(true);
    await orderAllCart();
    setCart([]);
    setLoadingCartOrder(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg border-bottom border-primary border-opacity-10 p-2">
        <a className="navbar-brand ms-2" href="/">
          <img style={{ maxWidth: 100 }} src="/logo1.png" alt="" />
        </a>
        <button
          className="navbar-toggler me-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between ms-3"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <span className="nav-link text-primary fw-bold">
                {user.fullName}{" "}
              </span>
            </li>
            <li className="nav-item">
              <Link to={"/products"} className="nav-link" href="#">
                Ürünler
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/orders"} className="nav-link" href="#">
                Siparişlerim
              </Link>
            </li>
            {user.role == "admin" ? (
              <li className="nav-item">
                <Link to={"/admin/setproduct"} className="nav-link">
                  Ürün ekle
                </Link>
              </li>
            ) : null}
          </ul>
          <a
            onClick={() => {
              logout();
            }}
            className="text-secondary link-underline link-underline-opacity-0 link-underline-opacity-25-hover me-3"
            type="button"
          >
            Çıkış
          </a>
        </div>
      </nav>

      <div className="container col-11 mt-4">
        <div className="row">{children}</div>
      </div>

      {user.role != "admin" ? (
        <>
          {" "}
          <button
            style={{
              position: "fixed",
              bottom: 20,
              right: 20,
              zIndex: 100,
              width: 80,
              height: 80,
              borderRadius: "50%",
              textAlign: "center",
              fontSize: 40,
              color: "white",
            }}
            type="button"
            data-bs-toggle="modal"
            data-bs-target=".modal"
            className="btn btn-primary btn-rounded"
          >
            <i className="bi bi-cart2"></i>
            <span
              style={{
                position: "absolute",
                top: -10,
                right: -10,
                backgroundColor: "tomato",
                color: "white",
                borderRadius: "50%",
                padding: "5px 13px",
                fontSize: "16px",
              }}
            >
              {cart.length}
            </span>
          </button>
          <div className="modal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Cart</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <CartCard carts={cart} />
                </div>
                <div className="modal-footer d-flex justify-content-between">
                  <button
                    onClick={() => {
                      if (cart.length == 0) {
                        toast.warning("Sepet zaten boş!");
                        return;
                      }
                      clearAllCart();
                    }}
                    type="button"
                    className="btn btn-outline-secondary"
                    data-bs-dismiss="modal"
                  >
                    <i className="bi bi-cart-x"></i> Tümünü İptal et{" "}
                    {loadingCart ? (
                      <Spinner color={"white"} size={"spinner-border-sm"} />
                    ) : null}
                  </button>
                  <button
                    onClick={() => {
                      //  Order cart func
                      orderCart();
                    }}
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn button btn-primary"
                  >
                    <i className="bi bi-cart-check"></i> Siparişi Tamamla{" "}
                    {loadingCartOrder ? (
                      <Spinner color={"white"} size={"spinner-border-sm"} />
                    ) : null}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      <Footer />
    </>
  );
}

export default MainPageLayout;
