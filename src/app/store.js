import { configureStore } from "@reduxjs/toolkit";
import {productReducer} from "../features/Product/productReducer";
import {cartReducer} from "../features/Cart/cartReducer";

export const store = configureStore({
  reducer: {
    productReducer,
    cartReducer,
  },
});
