import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =
  "https://my-json-server.typicode.com/dilipkumarbc8055/db/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(API_URL);
    console.log(response.data);
    return response.data;
  }
);
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (newProduct) => {
    console.log(newProduct);
    const response = await fetch(
      "https://my-json-server.typicode.com/dilipkumarbc8055/db/products",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      }
    ).then((response) => response.json());
    console.log(response);
    return response;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: { products: [], status: null, error: null },
  reducers: {
    editProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    sortProducts: (state, action) => {
      state.products.sort((a, b) => (a.price > b.price ? 1 : -1));
    },
    unsortProducts: (state) => {
      state.products = state.products.slice().sort((a, b) => a.id - b.id);
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.status = "loading";
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addProduct.fulfilled]: (state, action) => {
      state.products.push(action.payload);
    },
  },
});

export const productActions = productsSlice.actions;
export const productReducer = productsSlice.reducer;
export const productSelector = (state) => state.productReducer;
