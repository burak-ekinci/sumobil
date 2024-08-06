import React, { useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProductCard = () => {
  // Navigate user
  const navigate = useNavigate();

  // product defining
  const nameRef = useRef(null);
  const urlRef = useRef(null);
  const priceRef = useRef(null);
  const stockRef = useRef(null);

  const addProduct = async () => {
    const product = {
      name: nameRef.current.value,
      imgUrl: urlRef.current.value,
      price: priceRef.current.value,
      stock: stockRef.current.value,
    };
    try {
      const response = await axios.post(
        import.meta.env.VITE_KEY_CONNECTION_STRING + "/product/setproduct",
        product
      );
      if (!response.data.valid) {
        toast.error(response.data.message);
        return navigate("/admin/addproduct");
      } else if (response.data.valid) {
        toast.success(response.data.message);
        return navigate("/products");
      }
    } catch (error) {
      toast.error(error.message);
      return navigate("/products");
    }
  };

  return (
    <div className="container card-center mb-3">
      <div className="card">
        <h1 className="card-header fs-5">Ürün Ekle</h1>
        <div className="card-body">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addProduct();
            }}
          >
            <div className="form-group">
              <input
                ref={urlRef}
                type="text"
                className="form-control"
                id="imgUrl"
                placeholder="Ürün görseli URL..."
              />
            </div>

            <div className="form-group mt-3">
              <input
                ref={nameRef}
                type="text"
                className="form-control"
                id="productName"
                placeholder="Ürün adı..."
              />
            </div>

            <div className="form-group mt-3">
              <input
                ref={priceRef}
                type="text"
                className="form-control"
                id="price"
                placeholder="Fiyat..."
              />
            </div>
            <div className="form-group mt-3">
              <input
                ref={stockRef}
                type="text"
                className="form-control"
                id="price"
                placeholder="Stok..."
              />
            </div>

            <button type="submit" className="btn btn-primary py-2 px-4 my-4">
              <i className="bi bi-plus-square pe-2"></i> Yeni Ürün Ekle
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductCard;
