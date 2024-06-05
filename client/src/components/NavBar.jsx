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
        <a class="navbar-brand" href="#">
          <img
            src="/public/x.png"
            alt="Logo"
            width={90}
            data-aos="zoom-out"
            data-aos-delay="200"
            class="d-inline-block align-top img-fluid"
          />
        </a>

        <div className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Tweets
          </a>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                The World!
              </a>
            </li>

            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                My Tweets
              </a>
            </li>
          </ul>
        </div>

        <div className="nav-item dropdown me-5">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                Action
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
