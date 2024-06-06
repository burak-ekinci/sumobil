import React, { useReducer } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/LoginPage.jsx";
import Error from "./components/Error.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./components/Home.jsx";
import Card from "./components/Card.jsx";
import SignUpPage from "./components/SignupPage.jsx";
import MainPage from "./components/MainPage.jsx";
import { ToastContainer } from "react-toastify";
import UserProvider from "./state-management/contexts/userContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />, // Eşleşmeyen rotaları işle
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <Error />, // Eşleşmeyen rotaları işle
  },
  {
    path: "/signup",
    element: <SignUpPage />,
    errorElement: <Error />, // Eşleşmeyen rotaları işle
  },
  {
    path: "/home",
    element: <Layout />,
    errorElement: <Error />, // Eşleşmeyen rotaları işle
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </UserProvider>
  </React.StrictMode>
);
