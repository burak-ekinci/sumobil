import React from "react";

const SellerInfo = () => {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Satıcı Bilgileri</h2>
        </div>
        <div className="card-body">
          <ul>
            <li>
              <strong>Satıcı İsim:</strong>
              <p className="card-text">Burak Ekinci</p>
            </li>
            <li>
              <strong>Satıcı Telefon No:</strong>
              <p className="card-text">0541 123 9825</p>
            </li>
            <li>
              <strong>Satıcı Adres:</strong>
              <p className="card-text">
                X mahallesi x caddesi x sokağı bina no: x
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SellerInfo;
