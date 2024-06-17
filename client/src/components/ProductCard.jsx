import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Product from "./Product";

function ProductCard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_KEY_CONNECTION_STRING + "/product/getproducts"
        );
        setProducts(response.data.products);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getProducts();
  }, []);

  return (
    <>
      {products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </>
  );
}

export default ProductCard;
