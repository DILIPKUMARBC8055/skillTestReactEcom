import React, { useEffect } from "react";

import { RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./features/Product/productReducer";
import router from "./route/route";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer />
    </>
  );
}

export default App;
