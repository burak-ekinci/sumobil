import React, { useContext } from "react";
import { UserContext } from "../state-management/contexts/userContext";

const Card = () => {
  const { user, login, logout } = useContext(UserContext);

  return (
    <div className="card m-5">
      <div className="card-header d-flex fs-4">
        <i className="bi bi-person-circle me-2 ms-1 "></i>
        <div>
          <p className="card-text">lambdavnc</p>
        </div>
      </div>
      <div className="card-body">
        <p className="card-text">
          Arkamdan konuşup beste yapacağına, yüzüme konuş düet yapalım.
        </p>
        {/* <i class="bi bi-heart"></i> */}
        <div className="d-flex">
          <div className="me-3">
            <i style={{ color: "red" }} className="bi bi-heart-fill me-1"></i>
            <strong>1</strong>
          </div>

          <div className="">
            <i
              style={{ color: "blue" }}
              className="bi bi-hand-thumbs-down-fill me-1"
            ></i>
            <strong>100</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
