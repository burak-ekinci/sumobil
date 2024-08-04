import axios from "axios";
import { jwtDecode } from "jwt-decode";
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
export const test = (carts) => {
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

export const orderAllCart = async () => {
  const token = localStorage.getItem("user");
  const user = jwtDecode(token);
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    toast.error("Sepetiniz boş!");
    return;
  }

  let allOrdersSuccess = true;

  for (const item of cart) {
    try {
      const orderTemplate = {
        user: user.id,
        product: item.product._id,
        amount: item.amount,
        totalPrice: item.totalPrice,
        status: "Beklemede",
      };
      const response = await axios.post(
        "http://localhost:3000" + "/order/setorder",
        orderTemplate
      );
      if(response.data.error){
        throw new Error(response.data.error)
      }
      toast.success(
        response.data.message
      );
    } catch (error) {
      allOrdersSuccess = false;
      toast.error(
        item.product.name +
          " ürünü için hata : " +
        error.message
      );
    }
  }

  if (allOrdersSuccess) {
    localStorage.removeItem("cart");
    toast.success("Tüm siparişler başarıyla oluşturuldu!");
  } else {
    toast.error("Bazı ürünler için sipariş oluşturulamadı.");
  }
};


  

  