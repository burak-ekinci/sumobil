import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import PhoneInput from "react-phone-number-input";

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState();

  // use navigate hook for travel between pages
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

  // Access the HTML elements value man!
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef();
  const addressRef = useRef(null);
  const passwordRef = useRef(null);
  const rePasswordRef = useRef(null);

  // UserCheck function
  const userCheck = async () => {
    setLoading(true);
    // Password length must be min 4 char
    if (passwordRef.current.value.length < 4) {
      toast.warning("Şifre minimum 4 karakterli olmalı");
      setLoading(false);
      // don't show if user have
      return;
    }
    if (passwordRef.current.value != rePasswordRef.current.value) {
      toast.error("Şifreler eşleşmiyor!");
      setLoading(false);
      return;
    }

    const res = await axios
      .post(import.meta.env.VITE_KEY_CONNECTION_STRING + "/user/signup", {
        fullName: fullNameRef.current.value,
        email: emailRef.current.value,
        phone: value,
        address: addressRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => {
        if (res.data.valid == false) {
          setLoading(false);
          toast.error(res.data.message);
          navigate("/signup");
          return;
        }
        setLoading(false);
        toast.success(res.data.message);
        toast.info("Lütfen giriş yapın", {
          autoClose: 7000,
        });
        navigate("/login");
      })
      .catch((err) => {
        if (err.response.data.valid == false) {
          setLoading(false);
          toast.error(err.response.data.message);
          navigate("/signup");
          return;
        }
        setLoading(false);
        toast.error(err.response.data.message);
        navigate("/signup");
      });
  };
  // Phone number input validation
  function validatePhoneNumber() {
    var phoneNumber = phoneRef.current.value;
    var [firstElement] = phoneRef.current.value;

    if (firstElement == "0") {
      toast.error(
        "Lütfen başında 0 olmadan 10 haneli telefon numaranızı girin."
      );

      return;
    }

    // Türkiye telefon numarası doğrulama regex (başında 0 olmayan 10 haneli numara)
    var regex = /^[1-9][0-9]{9}$/;

    if (regex.test(phoneNumber)) {
      setValidationMessage("Telefon numarası geçerli");
      setValidationColor("success");
    } else {
      setValidationMessage(
        "Lütfen başında 0 olmadan 10 haneli telefon numaranızı girin."
      );
      setValidationColor("danger");
    }
  }

  return (
    <>
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <span className="d-flex justify-content-between align-items-center pt-2 pb-4">
                  <h1 className="card-title text-center text-primary fs-3 fw-bold">
                    KAYIT OL
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
                    {/* <label className="form-label text-secondary">
                      Ad Soyad
                    </label> */}
                    <input
                      type="text"
                      className="form-control"
                      id="text"
                      placeholder="Ad Soyad..."
                      ref={fullNameRef}
                      required
                    />
                  </div>
                  <div className="form-group pb-4">
                    {/* <label className="form-label text-secondary">Email</label> */}
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail"
                      placeholder="Email..."
                      aria-describedby="emailHelp"
                      ref={emailRef}
                      minLength={1}
                      required
                    />
                  </div>

                  <div className="form-group pb-4">
                    <PhoneInput
                      international
                      defaultCountry="TR"
                      placeholder="Enter phone number"
                      value={value}
                      onChange={setValue}
                    />
                  </div>

                  <div className="form-group pb-4">
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Su sipariş adresi..."
                      ref={addressRef}
                      required
                    />
                  </div>

                  <div className="form-group pb-4">
                    {/* <label className="form-label text-secondary">
                      Password
                    </label> */}
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword"
                      placeholder="Şifreniz..."
                      ref={passwordRef}
                      minLength={3}
                      maxLength={10}
                      required
                    />
                  </div>
                  <div className="form-group pb-4">
                    {/* <label className="form-label text-secondary">
                      Password
                    </label> */}
                    <input
                      type="password"
                      className="form-control"
                      id="inputrePassword"
                      placeholder="Şifreniz Tekrar..."
                      ref={rePasswordRef}
                      minLength={3}
                      maxLength={10}
                      required
                    />
                  </div>

                  <div className="row px-2 py-4">
                    <button type="submit" className="btn btn-primary">
                      KAYDOL{" "}
                      {loading ? (
                        <Spinner color={"white"} size={"spinner-border-sm"} />
                      ) : null}
                    </button>
                  </div>
                  <div className="row px-2">
                    <Link
                      to={"/login"}
                      type="button"
                      className="btn btn-outline-light text-secondary"
                    >
                      {" "}
                      Zaten hesabın var mı? Giriş yap →
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

export default SignUpPage;
