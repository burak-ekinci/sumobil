import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Product from "./Product";
import Spinner from "./Spinner";

function ProductCard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          import.meta.env.VITE_KEY_CONNECTION_STRING + "/product/getproducts"
        );
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.message);
      }
      setLoading(false);
    };
    getProducts();
  }, []);

  if (loading) {
    return (
      <>
        <div className="d-flex justify-content-center">
          <Spinner color={"primary"} size={"spinner-border-lg"} />
        </div>
      </>
    );
  }
  if (products.length == 0) {
    return (
      <div className="bg-secondary-subtle rounded-4 text-dark p-4 fs-5">
        <i className="bi bi-exclamation-square pe-2"></i> Lütfen ürün ekleyin.
      </div>
    );
  }

  return (
    <>
      {products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </>
  );
}

export default ProductCard;
