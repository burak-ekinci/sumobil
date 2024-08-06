import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 gap-2">
        <div className="row">
          <div>
            <img width={400} className="img-fluid" src="/logo1.png" alt="" />
          </div>
        </div>
        <div className="row mt-4 mb-2">
          <Link to={"/login"} className="btn btn-primary px-4">
            Giriş Yap
          </Link>
        </div>
        <div className="row">
          <Link to={"/signup"} className="btn btn-outline-primary px-4">
            Kayıt Ol
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
