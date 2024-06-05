import React, { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../state-management/contexts/userContext";

const LoginPage = () => {
  // Global State Management

  // Auth Context
  const { user, login, logout } = useContext(UserContext);

  // Get username and password value
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  // User Auth Context Log In Process
  const handleLogin = (users) => {
    login(users);
  };

  // User Auth Context Log In Process
  const handleLogout = () => {
    logout();
  };

  // Navigate Hook
  const navigate = useNavigate();

  // UserCheck function
  const userCheck = async () => {
    // Password uzunluğu minimum 4 karakter olacak
    if (passwordRef.current.value.length < 4) {
      toast.warning("Password must be min 4 char.");
      // user
      return;
    }

    // User logged template
    const userTemplate = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    // Mongodan sor hele bunun şifresi doğridır?
    await axios
      .post("http://localhost:3000/user/login", userTemplate)
      .then(async (response) => {
        // if username or password is true
        toast.success(response.data.message);
        await handleLogin(response.data.user);
        console.log(user);
        navigate(`/home`);
        return;
      })
      .catch((err) => {
        // username veya password yanlış!
        if (err.response.data.valid == false) {
          toast.error(err.response.data.message);
          navigate("/login");
          return;
        }
      });
  };

  return (
    <div className="container border m-5 p-3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          userCheck();
        }}
      >
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            ref={usernameRef}
            type="text"
            className="form-control"
            minLength={4}
            maxLength={10}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            ref={passwordRef}
            type="password"
            className="form-control"
            minLength={4}
            maxLength={10}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <div className="container d-flex-justify-content-center align-items-center p-2 m-2">
        <Link to={"/signup"} type="button" className="btn btn-outline-warning">
          {" "}
          Hesabın yok mu? Kaydol.
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
