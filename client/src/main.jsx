import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import MainPageLayout from "./layouts/MainPageLayout";
import ProductCard from "./components/ProductCard";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignupPage";
import Error from "./components/Error";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import SellerInfo from "./components/SellerInfo";
import Null from "./components/Null";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "./components/AdminLayout";
import AddProductCard from "./components/AddProductCard";
import OrderCard from "./components/OrderCard";
import { CartProvider } from "./contexts/CartContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <Error />,
  },
  0,
  {
    path: "/signup",
    element: <SignUpPage />,
    errorElement: <Error />,
  },
  {
    path: "/mainpage",
    element: <MainPageLayout children={<ProductCard />} />,
    errorElement: <Error />,
  },
  {
    path: "/products",
    element: <MainPageLayout children={<ProductCard />} />,
    errorElement: <Error />,
  },
  {
    path: "/orders",
    element: <MainPageLayout children={<OrderCard />} />,
    errorElement: <Error />,
  },
  {
    path: "/sellerinfo",
    element: <MainPageLayout children={<SellerInfo />} />,
    errorElement: <Error />,
  },
  {
    path: "/admin",
    errorElement: <Error />,
    children: [
      { path: "", element: <ProductCard /> },
      {
        path: "setproduct",
        element: <MainPageLayout children={<AddProductCard />} />,
      },
      { path: "orders", element: <AdminLayout children={"orders"} /> },
      { path: "sellerinfo", element: <AdminLayout children={"sellerinfo"} /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>

    <ToastContainer />
  </React.StrictMode>
);
