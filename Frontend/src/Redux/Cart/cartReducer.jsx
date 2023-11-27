import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddToCartApi } from "./CartApi";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingInfo: localStorage.getItem("shippingInfo")?JSON.parse(localStorage.getItem("shippinInfo")):{},
};

export const addToCartRequest = createAsyncThunk(
  "user/addToCart",
  async (value, { getState }) => {
    try {
      const response = await AddToCartApi(value);
      const currentState = getState();
      const item = {
        product: response.data.product._id,
        name: response.data.product.name,
        price: response.data.product.price,
        images: response.data.product.images[0].url,
        stock: response.data.product.Stock,
        quantity: value.quantity,
      };

      // Update the local storage with the new cartItems

      return item;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error; // Rethrow the error to mark the action as rejected
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeProductFromCart(state, action) {
      const productIdToRemove = action.payload;

      // Remove product from state
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== productIdToRemove
      );

      // Remove product from local storage
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...state.cartItems])
      );
    },
    saveShippingInfo(state, action) {
      const shippingDetails = action.payload;

      state.shippingInfo = shippingDetails;

      localStorage.setItem(
        "shippingInfo",
        JSON.stringify(shippingDetails)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartRequest.pending, (state) => {})
      .addCase(addToCartRequest.fulfilled, (state, action) => {
        const item = action.payload;
        const isItemExist = state.cartItems.find(
          (i) => i.product === item.product
        );
        if (isItemExist) {
          isItemExist.quantity = item.quantity;
        } else {
          state.cartItems.push(item);
        }
        localStorage.setItem(
          "cartItems",
          JSON.stringify([...state.cartItems])
        );
      })
      .addCase(addToCartRequest.rejected, (state, error) => {
        console.log(error);
      });
  },
});

export const { removeProductFromCart , saveShippingInfo } = cartSlice.actions;
export default cartSlice.reducer;
