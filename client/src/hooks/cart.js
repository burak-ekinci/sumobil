import axios from "axios";
import { toast } from "react-toastify";

// add order to cart
export const addCart = (product) => {
  
    // LocalStorage'dan mevcut sepeti al
    let cart = localStorage.getItem("cart");
  
    // Eğer sepet daha önce oluşturulmamışsa, boş bir dizi olarak başlat
    if (!cart) {
      cart = [];
    } else {
      // Eğer sepet varsa, JSON formatından JavaScript dizisine dönüştür
      cart = JSON.parse(cart);
    }
    cart.push(product);
  
    // Güncellenmiş sepeti tekrar JSON formatına dönüştür ve localStorage'a kaydet
    localStorage.setItem("cart", JSON.stringify(cart));
    
   
  };
  
  // clear cart from localstorage
  export const clearCart = () => {
    localStorage.removeItem("cart");
  toast.info("Sepet boşaltıldı")
  };
  
  // Remove one item
  export const removeFromCart = (productId) => {
    // LocalStorage'dan cart'ı al
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Belirtilen productId'ye sahip ürünü cart'tan çıkar
    const updatedCart = cart.filter((item) => item.product._id !== productId);
  
    // Güncellenmiş cart'ı localStorage'a geri kaydet
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  
// Make Order All Cart
export const orderAllCart = (carts) => {
  // LocalStorage'dan cart'ı al
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
    carts.map(async (product, index) => {
      try {
        const response = await axios.post(
          import.meta.env.VITE_KEY_CONNECTION_STRING + "/order/setorder",
          orderTemplate
        );
        if(response.valid == false){
          throw Error
        }
      } catch (error) {
        
      }
    })
}

// const instantOrder = async () => {
//   setLoadingNow(true);
//   try {
//     const orderTemplate = {
//       user: user.id,
//       product: product._id,
//       amount: amountRef.current.value,
//       totalPrice: amountRef.current.value * product.price,
//       status: "Beklemede",
//     };
//     const response = await axios.post(
//       import.meta.env.VITE_KEY_CONNECTION_STRING + "/order/setorder",
//       orderTemplate
//     );
//     setLoadingNow(false);
//     toast.success(
//       response.data.message +
//         amountRef.current.value +
//         " tane " +
//         product.name
//     );
//   } catch (error) {
//     setLoadingNow(false);
//     toast.error(error.message);
//   }
// };
   
  
  

  