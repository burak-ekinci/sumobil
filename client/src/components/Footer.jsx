import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light border-opacity-25 border-4 text-secondary border-top border-primary rounded-5 py-2">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-8 text-primary d-flex justify-content-center align-items-center">
            <img
              width={50}
              src="/icon.png"
              alt="SuMobilLogo"
              className="img-fluid me-2"
            />
            <h3>AGORA SU</h3>
          </div>

          <div className="col-lg-4 col-md-8 text-center col-md-6 ">
            <ul className="list-unstyled">
              <li>Burak Ekinci</li>
              <li className="fw-bold">0541 123 9825</li>
              <li>X mahallesi x caddesi x sokağı</li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-3 d-flex justify-content-center align-items-center">
            <a href="tel:+905411239825" className="btn btn-primary">
              Hemen Ara
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
