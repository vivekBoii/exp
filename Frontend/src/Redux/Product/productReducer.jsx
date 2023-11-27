import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProductApi,
  fetchProductDetailsApi,
  newReviewRequestApi,
  adminProductListRequestApi,
  newProductAdminApi,
  deleteProductAdminApi,
  updateProductAdminApi,
  AllReviewsAdminApi,
  deleteReviewsAdminApi,
  ProductwithoutPageApi,
} from "./ProductApi";

const initialState = {
  productItem: [],
  status: "loading",
  error: null,
  productDetails: {},
  productsCount: 0,
  resultPerPage: 0,
  filteredProductsCount: 0,
  success:false,
  reviews:[],
};

export const fetchAllProduct = createAsyncThunk(
  "products/fetchAllProduct",
  async ({
    keyword = "",
    activePage = 1,
    priceRange = [0, 1000000],
    category = "",
    starRatingFinal = 0,
  }) => {
    console.log(priceRange);
    const response = await fetchAllProductApi(
      keyword,
      activePage,
      priceRange,
      category,
      starRatingFinal
    );
    return response.data;
  }
);

export const ProductwithoutPage = createAsyncThunk(
  "products/ProductwithoutPage",
  async () => {
    const response = await ProductwithoutPageApi();
    return response.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const response = await fetchProductDetailsApi(id);
    return response.data.product;
  }
);

export const newReviewRequest = createAsyncThunk(
  "products/newReviewRequest",
  async (value) => {
    const response = await newReviewRequestApi(value);
    return response.data;
  }
);

export const adminProductListRequest = createAsyncThunk(
  "products/adminProductListRequest",
  async () => {
    const response = await adminProductListRequestApi();
    return response.data;
  }
);

export const newProductAdmin = createAsyncThunk(
  "products/newProductAdmin",
  async (value) => {
    const response = await newProductAdminApi(value);
    return response.data;
  }
);

export const deleteProductAdmin = createAsyncThunk(
  "products/deleteProductAdmin",
  async (id) => {
    const response = await deleteProductAdminApi(id);
    return response.data;
  }
);

export const updateProductAdmin = createAsyncThunk(
  "products/updateProductAdmin",
  async ({id,myForm}) => {
    const response = await updateProductAdminApi({id,myForm});
    return response.data;
  }
);


export const AllReviewsAdmin = createAsyncThunk(
  "products/AllReviewsAdmin",
  async (id) => {
    const response = await AllReviewsAdminApi(id);
    return response.data;
  }
);

export const deleteReviewsAdmin = createAsyncThunk(
  "products/deleteReviewsAdmin",
  async ({reviewId,productId}) => {
    const response = await deleteReviewsAdminApi({reviewId,productId});
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.status = "success";
        state.productItem = action.payload.products;
        state.resultPerPage = action.payload.resultPerPage;
        state.filteredProductsCount = action.payload.filteredProductsCount;
      })
      .addCase(fetchAllProduct.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })
      .addCase(ProductwithoutPage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(ProductwithoutPage.fulfilled, (state, action) => {
        state.status = "success";
        state.productItem = action.payload.products;
        state.filteredProductsCount = action.payload.filteredProductsCount;
      })
      .addCase(ProductwithoutPage.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.status = "success";
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })
      .addCase(newReviewRequest.pending, (state) => {})
      .addCase(newReviewRequest.fulfilled, (state, action) => {})
      .addCase(newReviewRequest.rejected, (state, action) => {})
      .addCase(adminProductListRequest.pending, (state) => {})
      .addCase(adminProductListRequest.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(adminProductListRequest.rejected, (state, action) => {})
      .addCase(newProductAdmin.pending, (state) => {})
      .addCase(newProductAdmin.fulfilled, (state, action) => {
          console.log(action);
        state.success=true;
      })
      .addCase(newProductAdmin.rejected, (state, action) => {})
      .addCase(deleteProductAdmin.pending, (state) => {})
      .addCase(deleteProductAdmin.fulfilled, (state, action) => {})
      .addCase(deleteProductAdmin.rejected, (state, action) => {})
      .addCase(AllReviewsAdmin.pending, (state) => {})
      .addCase(AllReviewsAdmin.fulfilled, (state, action) => {
        state.reviews=action.payload;
      })
      .addCase(AllReviewsAdmin.rejected, (state, action) => {})
      .addCase(deleteReviewsAdmin.pending, (state) => {})
      .addCase(deleteReviewsAdmin.fulfilled, (state, action) => {})
      .addCase(deleteReviewsAdmin.rejected, (state, action) => {})
  },
});


export default productSlice.reducer;
