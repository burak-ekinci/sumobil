import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
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

  // Get username and password value
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);

  // Navigate Hook
  const navigate = useNavigate();

  // UserCheck function
  const userCheck = async () => {
    setLoading(true);
    // Password uzunluğu minimum 4 karakter olacak
    if (passwordRef.current.value.length < 4) {
      toast.warning("şifre minimum 4 karakterli olmalı");
      // user
      return;
    }

    // User logged template
    const userTemplate = {
      phone: phoneRef.current.value,
      password: passwordRef.current.value,
    };

    // Mongodan sor hele bunun şifresi doğridır?
    await axios
      .post(
        import.meta.env.VITE_KEY_CONNECTION_STRING + "/user/login",
        userTemplate
      )
      .then(async (response) => {
        if (!response.data.valid) {
          setLoading(false);
          toast.error(response.data.message);
          navigate("/login");
        }

        // if username or password is true
        const token = response.data.token;
        setLoading(false);
        toast.success(response.data.message);
        window.localStorage.setItem("user", token);
        navigate(`/products`);

        return;
      })
      .catch((err) => {
        // username veya password yanlış!
        if (err.response.data.valid == false) {
          setLoading(false);
          toast.error(err.response.data.message);
          navigate("/login");
          return;
        }
      });
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
                      src="/logo1.png"
                      alt="Logo"
                      width={200}
                      data-aos="zoom-out"
                      data-aos-delay="200"
                      className="d-inline-block align-top img-fluid"
                    />
                  </a>
                </h3>
                <hr />
                <h3 className="card-title text-center fs-2 text-primary">
                  GİRİŞ YAP
                </h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    userCheck();
                  }}
                >
                  <div className="form-group mb-3">
                    <label>Tel No</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Telefon numaranızı girin"
                      ref={phoneRef}
                      minLength={10}
                      maxLength={10}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Şifre</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Şifrenizi girin"
                      ref={passwordRef}
                      minLength={3}
                      maxLength={10}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-md px-4 btn-block"
                  >
                    Giriş Yap{" "}
                    {loading ? (
                      <Spinner color={"white"} size={"spinner-border-sm"} />
                    ) : null}
                  </button>
                </form>
                <div className="container d-flex justify-content-center align-items-center mt-3">
                  <Link
                    to={"/signup"}
                    type="button"
                    className="btn btn-sm btn-outline-warning"
                  >
                    {" "}
                    Hesabın yok mu? Kaydol.
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
