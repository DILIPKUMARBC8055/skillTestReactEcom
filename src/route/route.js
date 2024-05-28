const { createBrowserRouter, Route } = require("react-router-dom");
const { default: Navbar } = require("../component/Navbar");
const { default: ProductsList } = require("../component/Product");
const { default: Cart } = require("../component/Cart");
const { default: AddProduct } = require("../component/AddProduct");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      { path: "/", element: <ProductsList /> },
      { path: "cart", element: <Cart /> },
      { path: "addProduct", element: <AddProduct /> },
    ],
  },
]);
export default router;
