import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SignUpPage = () => {
  useEffect(() => {
    const checkLogin = () => {
      const token = window.localStorage.getItem("user");
      if (token) {
        toast.warning("Zaten giriş yapılmış");
        return navigate("/products");
      }
    };

    checkLogin();
  }, []);
  // Access the HTML elements value man!
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const passwordRef = useRef(null);

  // use navigate hook for travel between pages
  const navigate = useNavigate();

  // UserCheck function
  const userCheck = async () => {
    // Password length must be min 4 char
    if (passwordRef.current.value.length < 4) {
      toast.warning("Şifre minimum 4 karakterli olmalı");
      // don't show if user have
      return;
    }
    const res = await axios
      .post("http://localhost:3000/user/signup", {
        fullName: fullNameRef.current.value,
        email: emailRef.current.value,
        phone: phoneRef.current.value,
        address: addressRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => {
        if (res.data.valid == false) {
          toast.error(res.data.message);
          navigate("/signup");
          return;
        }

        toast.success(res.data.message);
        toast.info("Lütfen giriş yapın", {
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
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center">
                  <a className="navbar-brand" href="/">
                    <img
                      src="/public/logo1.png"
                      alt="Logo"
                      width={200}
                      data-aos="zoom-out"
                      data-aos-delay="200"
                      className="d-inline-block align-top img-fluid"
                    />
                  </a>
                </h3>
                <hr />
                <h3 className="card-title text-center text-primary fs-2">
                  KAYIT OL
                </h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    userCheck();
                  }}
                >
                  <div className="form-group mb-3">
                    <label className="form-label">İsim Soyisim</label>
                    <input
                      type="text"
                      className="form-control"
                      id="text"
                      placeholder="İsminizi ve Soyisminizi girin"
                      ref={fullNameRef}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail"
                      placeholder="Email girin"
                      aria-describedby="emailHelp"
                      ref={emailRef}
                      minLength={1}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label className="form-label">Telefon Numaranız</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputUsername"
                      placeholder="Telefon numaranızı girin"
                      ref={phoneRef}
                      minLength={10}
                      maxLength={10}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label className="form-label">Su İstenilecek Adres</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Su isteyeceğiniz ev adresini girin"
                      ref={addressRef}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword"
                      placeholder="Şifrenizi girin"
                      ref={passwordRef}
                      minLength={3}
                      maxLength={10}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success btn-md px-4 btn-block"
                  >
                    KAYDOL
                  </button>
                </form>
                <div className="container d-flex-justify-content-center align-items-center p-2 m-2">
                  <Link
                    to={"/login"}
                    type="button"
                    className="btn btn-sm btn-outline-success"
                  >
                    {" "}
                    Zaten hesabın var mı? Giriş yap.
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container border m-5 p-3">
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
      </div> */}
    </>
  );
};

export default SignUpPage;
