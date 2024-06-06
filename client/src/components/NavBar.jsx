import { useContext } from "react";
import { UserContext } from "../state-management/contexts/userContext";

const NavBar = () => {
  // Auth Context
  const { user, login, logout } = useContext(UserContext);
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-aos="zoom-out"
      data-aos-delay="200"
    >
      <div className="container-fluid  d-flex justify-content-around">
        <a className="navbar-brand" href="#">
          <img
            src="/public/x.png"
            alt="Logo"
            width={90}
            data-aos="zoom-out"
            data-aos-delay="200"
            className="d-inline-block align-top img-fluid"
          />
        </a>

        <div className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle fs-5"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Tweets
            <i className="bi bi-activity ms-1"></i>
          </a>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                <i className="bi bi-globe-americas me-1"></i>The World!
              </a>
            </li>

            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <i className="bi bi-person-circle me-1"></i> My Tweets
              </a>
            </li>
          </ul>
        </div>

        <div className="nav-item dropdown me-5">
          <a
            className="nav-link dropdown-toggle fs-5"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {user.username} <i className="bi bi-person-circle"></i>
          </a>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                <i className="bi bi-box-arrow-right me-1"></i>Log Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
