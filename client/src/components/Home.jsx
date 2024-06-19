import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: "url(/hero-bg.png)",
        height: "100vh",
      }}
    >
      <nav className="navbar navbar-expand-lg navbar-light bg-light ms-4 d-flex justify-content-around">
        <a className="navbar-brand" href="/">
          <img style={{ maxWidth: 120 }} src="/logo1.png" alt="" />
        </a>

        <div className="nav-item">
          <Link to={"/login"} className="btn btn-primary btn-sm me-3">
            Giriş Yap
          </Link>
          <Link to={"/signup"} className="btn btn-outline-primary btn-sm">
            Kayıt Ol
          </Link>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div
            style={{ height: "35vh" }}
            className="col-md-6 d-flex justify-content-center align-items-center"
          >
            <div className="fs-1">
              <h1 className="text-primary">
                <strong>SU MOBİL</strong>
              </h1>
              <h2>Su istiyorsan mobilden iste :)</h2>
            </div>
          </div>
          <div
            style={{ height: "35vh" }}
            className="col-md-6 d-flex justify-content-center align-items-center"
          >
            <div>
              <img width={400} className="img-fluid" src="/logo1.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
