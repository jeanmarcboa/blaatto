import { createSlice } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

type InitialState = {
  value: any;
};

const initialState = {
  value: [],
} as InitialState;

export const productImages = createSlice({
  name: "productImages",
  initialState,
  reducers: {
    updateproductImages: (_, action) => {
      return {
        value: action.payload,
      };
    },
  },
});

export const { updateproductImages } = productImages.actions;
export default productImages.reducer;
