import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../state-management/contexts/userContext";

const Home = () => {
  const { user, login, logout } = useContext(UserContext);
  return (
    <div className="container border border-3 rounded p-5 m-5 row row-cols-auto d-flex justify-content-around align-items-center">
      <div className="col">
        <h1>ApeX: Think, Write.</h1>
        <h2>{user}</h2>
      </div>
      <div className="col">
        <Link className="btn btn-warning btn-lg" to="/login">
          {" "}
          Başlayalım{" "}
        </Link>
      </div>
    </div>
  );
};

export default Home;
