import { useEffect, useState } from "react";
import Card from "./Card";
import NavBar from "./NavBar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const [tweets, setTweets] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getAllTweets() {
      try {
        const response = await axios.get(
          "http://localhost:3000/tweet/getAllTweets"
        );
        setTweets(response.data.tweets);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching tweets:", error);
        setLoading(false);
      }
    }
    getAllTweets();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {/* //loading spinner */}
            {loading && (
              <div className="d-flex justify-content-center text-info my-3">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            {!loading && tweets.map((tw) => <Card key={tw._id} tweet={tw} />)}
            {/* <Card tweet={tweets[0]} /> */}
          </div>
        </div>
      </div>
      <button
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 100,
          width: 80,
          height: 80,
          borderRadius: "50%",
          textAlign: "center",
          fontSize: 40,
        }}
        type="button"
        data-bs-toggle="modal"
        data-bs-target=".modal"
        className="btn btn-primary btn-rounded"
      >
        <i className="bi bi-feather"></i>
      </button>

      <div className="modal m-3">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Yeni Tweet</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body me-5">
              <div className="mb-3">
                <label className="form-label">Metin:</label>
                <textarea
                  className="form-control"
                  id="paylasMetni"
                  rows="3"
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Vazgeç
              </button>
              <button type="button" className="btn btn-primary">
                PAYLAŞ
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
