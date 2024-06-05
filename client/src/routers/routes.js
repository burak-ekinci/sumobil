import {createBrowserRouter} from "react-router-dom";
import LoginPage from "../components/LoginPage"
import Error from "../components/Error";
import Home from "../components/Home";
import Layout from "../components/Layout";
import Card from "../components/Card";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />, // Eşleşmeyen rotaları işle
  },
  {
    path: "/login",
    element: <Layout children={<LoginPage />} />,
    errorElement: <Error />, // Eşleşmeyen rotaları işle
  },
  {
    path: "/mainpage",
    element: <Layout children={<Card />} />,
    errorElement: <Error />, // Eşleşmeyen rotaları işle
  },
]);

export default router;