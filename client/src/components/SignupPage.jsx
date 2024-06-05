import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SignUpPage = () => {
  // Access the HTML elements value man!
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  // use navigate hook for travel between pages
  const navigate = useNavigate();

  // UserCheck function
  const userCheck = async () => {
    // Password length must be min 4 char
    if (passwordRef.current.value.length < 4) {
      toast.warning("Password can be min 4 char.");
      // don't show if user have
      return;
    }
    const res = await axios
      .post("http://localhost:3000/user/signup", {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => {
        if (res.data.valid == false) {
          toast.error(res.data.message);
          navigate("/signup");
          return;
        }

        toast.success(res.data.message);
        toast.info("Please Log In now", {
          autoClose: 7000,
        });
        navigate("/login");
      })
      .catch((err) => {
        if (err.response.data.valid == false) {
          toast.error(err.response.data.message);
          navigate("/signup");
          return;
        }
        toast.error(err.response.data.message);
        navigate("/signup");
      });

    console.log("response: --> ", res);
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
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            aria-describedby="email"
            ref={emailRef}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            minLength={4}
            maxLength={10}
            className="form-control"
            id="inputUsername"
            aria-describedby="username"
            ref={usernameRef}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            minLength={4}
            maxLength={10}
            className="form-control"
            id="inputPassword"
            ref={passwordRef}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <div className="container d-flex-justify-content-center align-items-center p-2 m-2">
        <Link to={"/login"} type="button" className="btn btn-outline-warning">
          {" "}
          Hesabın var mı? giriş yap.
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
