import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  productSelector,
} from "../features/Product/productReducer";
import "./AddProduct.css";
import { Bounce, toast } from "react-toastify";

const AddProduct = () => {
  let id = useSelector(productSelector).products.length;
  id++;
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    id: id,
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    if (e.target.name == "Price") {
      setProduct({
        ...product,
        [e.target.name]: Number(e.target.value),
      });
    } else
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (product.name && product.description && product.price && product.image) {
      dispatch(addProduct(product))
        .unwrap()
        .then(() => {
          toast.success("Product added Successfully", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          setProduct({
            id: id,
            name: "",
            description: "",
            price: "",
            image: "",
          });
        })
        .catch((error) => {
          toast.error("Failed to add product ", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          console.log(error.message);
        });
    } else {
      toast.warn("Please fill in all fields.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="add-product-container">
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={product.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={product.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            name="image"
            id="image"
            value={product.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
