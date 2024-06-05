import React from "react";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
