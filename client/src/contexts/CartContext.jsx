import React, { createContext, useEffect, useState } from "react";

// CartContext oluşturuyoruz
export const CartContext = createContext();

// CartProvider bileşenini oluşturuyoruz
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Başlangıçta localStorage'dan sepet verilerini çekiyoruz
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sepet verileri değiştiğinde localStorage'ı güncelliyoruz
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
