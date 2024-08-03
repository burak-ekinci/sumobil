import axios from "axios"
import { toast } from "react-toastify";

export const updatePrice = async (product) => {
    try {
        const updateObj = {
          id: product._id,
          price: product.price,
        };
        const response = await axios.post(
         "http://localhost:3000" + "/product/updateprice",
          updateObj
        );
        toast.success(
          response.data.message
        );
      } catch (error) {
        toast.error(error.message);
      }


}

export const updateStock = async (product) => {
    try {
        const updateObj = {
         id: product._id,
          stock: product.stock,
        };
        const response = await axios.post(
         "http://localhost:3000" + "/product/updatestock",
          updateObj
        );
        toast.success(
          response.data.message
        );
      } catch (error) {
        toast.error(error.message);
      }


}

