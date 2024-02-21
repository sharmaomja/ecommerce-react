import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchProductsByFilters, fetchBrands, fetchCategories, fetchProductById, } from './productAPI';

const initialState = {
  products: [],
  brands: [],
  categories: [],
  status: 'idle',
  totalItems: 0,
  selectedProduct: null,
  comments: [],
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    try {
      const response = await fetchAllProducts();
      return { payload: response.data }; // Add the 'payload' property
    } catch (error) {
      throw error;
    }
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({ filter, sort, pagination }) => { // Combine filter and sort into a single object
    const response = await fetchProductsByFilters(filter, sort, pagination);
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);

export const addCommentToProduct = createSlice({
  name: 'product',
  reducers: {
    addComment: (state, action) => {
      const { productId, comment } = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        if (!product.comments) {
          product.comments = [];
        }
        product.comments.push(comment);
      }
    },
  },
});

export const { addComment } = addCommentToProduct.actions;

function filterProductsBySearchTerm(products, searchTerm) {
  return products.filter((product) => {
    const titleMatch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const descriptionMatch = product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return titleMatch || descriptionMatch;
  });
}

export const searchProductsAsync = createAsyncThunk(
  'product/searchProducts',
  async (searchTerm, { getState }) => {
    const state = getState();
    const allProducts = selectAllProducts(state); // Replace with your selector
    const filteredProducts = filterProductsBySearchTerm(allProducts, searchTerm);
    return filteredProducts;
  }
);


export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(searchProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(addCommentToProduct.actions.addComment, (state, action) => {
        state.comments.push(action.payload.comment);
      });
  },
});

export const { increment } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectAllBrands = (state) => state.product.brands;
export const selectAllCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;

export const selectTotalItems = (state) => state.product.totalItems;


export default productSlice.reducer;