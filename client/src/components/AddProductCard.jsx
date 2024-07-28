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
    <div className="container card-center">
      <div className="card">
        <div className="card-header">Ürün Ekle</div>
        <div className="card-body">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addProduct();
            }}
          >
            <div className="form-group">
              <label>Ürün Resmi</label>
              <input
                ref={urlRef}
                type="text"
                className="form-control"
                id="imgUrl"
                placeholder="Ürün resmi URL si girin"
              />
            </div>

            <div className="form-group mt-2">
              <label>Ürün adı</label>
              <input
                ref={nameRef}
                type="text"
                className="form-control"
                id="productName"
                placeholder="Ürün adı girin"
              />
            </div>

            <div className="form-group mt-2">
              <label>Fiyat</label>
              <input
                ref={priceRef}
                type="text"
                className="form-control"
                id="price"
                placeholder="Fiyat girin"
              />
            </div>
            <div className="form-group mt-2">
              <label>Stok</label>
              <input
                ref={stockRef}
                type="text"
                className="form-control"
                id="price"
                placeholder="Fiyat girin"
              />
            </div>

            <button type="submit" className="btn btn-success mt-3">
              Ürün gir
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductCard;
