import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Error = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const error = () => {
      toast.error("Oturum açılmadan bu Endpoint'e erişilemez.");
    };
    error();
  }, []);

  const sendLoginPage = () => {
    toast.info("Giriş Yap sayfasına yönlendiriliyorsunuz.");
    navigate("/login");
  };
  return (
    <>
      {/* <div classNameName="p-3 m-5 text-center text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">
        <strong>Error: Oturum açılmadan bu Endpoint'e erişilemez.</strong>
      </div> */}
      <div className="container mt-5 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card text-center">
              <div className="card-body bg-danger-subtle">
                <strong className="text-danger">
                  Hata: Oturum açılmadan bu Endpoint'e erişilemez!
                </strong>
                <div className="mt-3">
                  <button onClick={sendLoginPage} className="btn btn-danger">
                    Giriş Yap
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <button onClick={sendLoginPage} classNameName="btn btn-secondary">
        Giriş Yap
      </button> */}
    </>
  );
};

export default Error;
