import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="d-flex flex-wrap justify-content-around bg-light border-opacity-10 border-2 text-secondary border-top border-secondary py-4 gap-4">
        <div className="d-flex flex-column gap-2 text-primary justify-content-center align-items-center">
          <img
            width={50}
            src="/icon.png"
            alt="SuMobilLogo"
            className="img-fluid me-2"
          />
          <h2 className=" fs-4 fw-bold">AGORA SU</h2>
          <span className="text-secondary"> ©2024 - Her hakkı saklıdır.</span>
        </div>

        <div className="d-flex flex-column gap-2 text-secondary justify-content-center align-items-center text-start">
          <ul className="list-group list-group-flush">
            <li className="list-group-item list-group-item-light">
              <i className="bi bi-headset pe-2"></i>Gökhan Öztürk
            </li>
            <a
              href="tel:+905411239825"
              className="list-group-item  list-group-item-light float-start"
            >
              <i className="bi bi-telephone-outbound pe-2"></i> 0541 123 9825
            </a>
            <li className="list-group-item list-group-item-light">
              <i className="bi bi-buildings pe-2"></i>İsmet Kaptan Mh. 1374 Sk.
              14/603 Konak, İzmir
            </li>
          </ul>
        </div>

        {/* <div className="justify-content-center align-items-center">
        <a href="tel:+905411239825" className="btn btn-primary">
          Hemen Ara
        </a>
      </div> */}
      </footer>
      <div className="d-flex justify-content-center align-items-center bg-light border-opacity-10 border-2 text-secondary border-top border-secondary py-4 ">
        <span>
          Su satış bayi yazılımı -{" "}
          <a className="text-decoration-none" href="https://sumobil.com">
            Su Mobil
          </a>
        </span>
      </div>
    </>
  );
};

export default Footer;
