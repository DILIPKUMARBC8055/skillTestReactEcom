import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Product.css";
import {
  fetchProducts,
  productActions,
  productSelector,
} from "../features/Product/productReducer";
import { cartActions } from "../features/Cart/cartReducer";
import { Bounce, toast } from "react-toastify";

const ProductsList = () => {
  const dispatch = useDispatch();
  const products = useSelector(productSelector).products;
  console.log(products);

  const { status } = useSelector(productSelector);
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditedProduct(product);
  };

  const handleSaveClick = () => {
    dispatch(productActions.editProduct(editedProduct));
    setEditingId(null);
    toast.success("Product updated Successfully", {
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
  };

  const handleDeleteClick = (id) => {
    dispatch(productActions.deleteProduct(id));
    toast.success("Product deleted successfully!", {
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
  };

  const handleSortClick = () => {
    dispatch(productActions.sortProducts());
  };

  const handleUnsortClick = () => {
    dispatch(productActions.unsortProducts());
  };

  const handleAddToCartClick = (product) => {
    dispatch(cartActions.addToCart(product));
    toast.success("Product added to cart!", {
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
  };

  return (
    <div className="products-container">
      <h1>All Products</h1>
      <div className="sort-buttons">
        <button onClick={handleSortClick}>Sort by Price</button>
        <button onClick={handleUnsortClick}>Remove Sort</button>
      </div>
      <div className="products-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            {editingId === product.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editedProduct.name}
                  onChange={(e) =>
                    setEditedProduct({ ...editedProduct, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={editedProduct.description}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      description: e.target.value,
                    })
                  }
                />
                <input
                  type="number"
                  value={editedProduct.price}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      price: parseFloat(e.target.value),
                    })
                  }
                />
                <button onClick={handleSaveClick}>Save</button>
              </div>
            ) : (
              <>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>${Number(product.price).toFixed(2)}</p>
                <div className="product-buttons">
                  <button onClick={() => handleEditClick(product)}>✏️</button>
                  <button onClick={() => handleDeleteClick(product.id)}>
                    🗑️
                  </button>
                  <button onClick={() => handleAddToCartClick(product)}>
                    Add to Cart
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
