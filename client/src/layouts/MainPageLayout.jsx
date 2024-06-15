import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
// import isTokenExpired from "../hooks/jwtExpire";

function MainPageLayout({ children }) {
  const navigate = useNavigate();

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      if (!decoded.exp) {
        return true;
      }
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  };
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

  // Logout Function
  const logout = () => {
    localStorage.removeItem("user");
    toast.success("Başarı ile çıkış yapıldı");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
              <Link to={"/products"} className="nav-link" href="#">
                Ürünler
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/orders"} className="nav-link" href="#">
                Siparişlerim
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/sellerinfo"} className="nav-link" href="#">
                Satıcı bilgileri
              </Link>
            </li>
            {user.role == "admin" ? (
              <li className="nav-item">
                <Link to={"/admin/setproduct"} className="nav-link">
                  Ürün ekle
                </Link>
              </li>
            ) : null}
            <li className="nav-item">
              <span className="nav-link text-primary fw-bold">
                Hesap: {user.fullName}{" "}
              </span>
            </li>
          </ul>
          <a
            onClick={() => {
              logout();
            }}
            className="btn btn-outline-danger me-3"
            type="button"
          >
            Çıkış Yap
          </a>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">{children}</div>
        </div>
      </div>
    </>
  );
}

export default MainPageLayout;
