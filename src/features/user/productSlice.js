import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Step 1: Create an async thunk for creating a product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));
      formData.append("photo", productData.photo);
      formData.append("additionalPhoto", productData.additionalPhoto);

      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      return await response.json(); // The newly created product data
    } catch (error) {
      return rejectWithValue(error.message); // Pass the error to the reducer
    }
  }
);

// Step 2: Define the initial state
const initialState = {
  isLoading: false,
  success: false,
  error: null,
  products: [],
};

// Step 3: Create the slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // You can define additional synchronous actions here if needed
  },
  extraReducers: (builder) => {
    // Handle async actions
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.products.push(action.payload); // Add the new product to the list
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Capture the error message
      });
  },
});

// Step 4: Export the reducer to be used in the store configuration
export default productSlice.reducer;
