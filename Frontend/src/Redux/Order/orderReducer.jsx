import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  DeleteOrderRequestApi,
  OrderDetailsRequestApi,
  UpdateOrderRequestApi,
  createOrderRequestApi,
  getAllOrdersRequestApi,
  myOrderRequestApi,
} from "./OrderApi";

const initialState = {
  myOrders: {},
  orderDetails: {},
  allorders: {},
};

export const createOrderRequest = createAsyncThunk(
  "order/createOrderRequest",
  async (value) => {
    const response = await createOrderRequestApi(value);
    return response.data;
  }
);

export const myOrderRequest = createAsyncThunk(
  "order/myOrderRequest",
  async () => {
    const response = await myOrderRequestApi();
    return response.data;
  }
);

export const OrderDetailsRequest = createAsyncThunk(
  "order/OrderDetailsRequest",
  async (id) => {
    const response = await OrderDetailsRequestApi(id);
    return response.data;
  }
);

export const getAllOrdersRequest = createAsyncThunk(
  "order/getAllOrdersRequest",
  async () => {
    const response = await getAllOrdersRequestApi();
    return response.data;
  }
);

export const UpdateOrderRequest = createAsyncThunk(
  "order/UpdateOrderRequest",
  async ({ myForm, id }) => {
    const response = await UpdateOrderRequestApi({ myForm, id });
    return response.data;
  }
);
export const DeleteOrderRequest = createAsyncThunk(
  "order/DeleteOrderRequest",
  async (id) => {
    const response = await DeleteOrderRequestApi(id);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderRequest.pending, (state) => {})
      .addCase(createOrderRequest.fulfilled, (state, action) => {})
      .addCase(createOrderRequest.rejected, (state, action) => {})
      .addCase(myOrderRequest.pending, (state) => {})
      .addCase(myOrderRequest.fulfilled, (state, action) => {
        state.myOrders = action.payload;
      })
      .addCase(myOrderRequest.rejected, (state, action) => {})
      .addCase(OrderDetailsRequest.pending, (state) => {})
      .addCase(OrderDetailsRequest.fulfilled, (state, action) => {
        state.orderDetails = action.payload;
      })
      .addCase(OrderDetailsRequest.rejected, (state, action) => {})
      .addCase(getAllOrdersRequest.pending, (state) => {})
      .addCase(getAllOrdersRequest.fulfilled, (state, action) => {
        state.allorders = action.payload;
      })
      .addCase(getAllOrdersRequest.rejected, (state, action) => {})
      .addCase(UpdateOrderRequest.pending, (state) => {})
      .addCase(UpdateOrderRequest.fulfilled, (state, action) => {})
      .addCase(UpdateOrderRequest.rejected, (state, action) => {})
      .addCase(DeleteOrderRequest.pending, (state) => {})
      .addCase(DeleteOrderRequest.fulfilled, (state, action) => {})
      .addCase(DeleteOrderRequest.rejected, (state, action) => {});
  },
});

export default orderSlice.reducer;
