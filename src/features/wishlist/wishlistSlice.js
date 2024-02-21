import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToWishlist, deleteItemFromWishlist, fetchWishlistItemsByUserId, moveItemToCart } from './wishlistAPI';

const initialState = {
  status: 'idle',
  items: [],
};

export const addToWishlistAsync = createAsyncThunk(
  'wishlist/addToWishlist',
  async (item) => {
    const response = await addToWishlist(item);
    return response.data;
  }
);

export const fetchWishlistItemsByUserIdAsync = createAsyncThunk(
  'wishlist/fetchWishlistItemsByUserId',
  async (userId) => {
    const response = await fetchWishlistItemsByUserId(userId);
    return response.data;
  }
);

export const deleteItemFromWishlistAsync = createAsyncThunk(
  'wishlist/deleteItemFromWishlist',
  async (itemId) => {
    const response = await deleteItemFromWishlist(itemId);
    return response.data;
  }
);


export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlistAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToWishlistAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchWishlistItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWishlistItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(deleteItemFromWishlistAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromWishlistAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex((item) => item.id === action.payload);
        state.items.splice(index, 1);
      })
  },
});

export const selectWishlistItems = (state) => state.wishlist.items;

export const selectMovedItem = (state) => state.wishlistToCart.movedItem;


export default wishlistSlice.reducer;
