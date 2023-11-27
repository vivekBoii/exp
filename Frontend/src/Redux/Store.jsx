import { configureStore } from '@reduxjs/toolkit';
import productSlice from './Product/productReducer';
import userSlice  from './User/userReducer';
import cartSlice from './Cart/cartReducer';
import  orderSlice  from './Order/orderReducer';

export const store = configureStore({
  reducer: {
    products: productSlice,
    user: userSlice,
    cart: cartSlice,
    order: orderSlice,
  },
})

export default store;