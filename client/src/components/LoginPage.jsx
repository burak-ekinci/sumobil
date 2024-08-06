import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import PhoneInput from "react-phone-number-input";

const LoginPage = () => {
  // State managements
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState();

  // Navigate Hook
  const navigate = useNavigate();
  useEffect(() => {
    const checkLogin = () => {
      const token = window.localStorage.getItem("user");
      if (token) {
        toast.warning("Zaten giriş yapılmış");
        navigate("/products");
      }
    };

    checkLogin();
  }, [navigate]);

  // Get username and password value
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);

  // UserCheck function
  const userCheck = async () => {
    setLoading(true);
    // Password uzunluğu minimum 4 karakter olacak
    if (passwordRef.current.value.length < 4) {
      toast.warning("Şifre minimum 4 karakterli olmalı");
      return;
    }

    // User logged template
    const userTemplate = {
      phone: value,
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
                <span className="d-flex justify-content-between align-items-center pt-2 pb-4">
                  <h1 className="card-title text-center text-primary fs-3 fw-bold">
                    GİRİŞ YAP
                  </h1>

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
                </span>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    userCheck();
                  }}
                >
                  <div className="form-group py-4">
                    <PhoneInput
                      international
                      defaultCountry="TR"
                      placeholder="Enter phone number"
                      value={value}
                      onChange={setValue}
                    />
                  </div>
                  <div className="form-group pb-4">
                    {/* <label>Şifre</label> */}
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Şifre..."
                      ref={passwordRef}
                      minLength={3}
                      maxLength={10}
                      required
                    />
                  </div>

                  <div className="row px-2 py-4">
                    <button
                      type="submit"
                      className="btn btn-primary align-items-center"
                    >
                      Giriş Yap{" "}
                      {loading ? (
                        <Spinner color={"white"} size={"spinner-border-sm"} />
                      ) : null}
                    </button>
                  </div>
                  <div className="row px-2">
                    <Link
                      to={"/signup"}
                      type="button"
                      className="btn btn-outline-light text-secondary"
                    >
                      {" "}
                      Hesabın yok mu? Kaydol →
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
