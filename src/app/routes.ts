import { createHashRouter } from "react-router";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetail from "../pages/ProductDetail";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Cart from "../pages/Cart";

export const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "shop", Component: Shop },
      { path: "product/:id", Component: ProductDetail },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "cart", Component: Cart },
    ],
  },
]);
