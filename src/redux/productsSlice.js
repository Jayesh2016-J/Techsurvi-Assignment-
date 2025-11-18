// src/redux/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API_BASE = 'https://fakestoreapi.com'

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  const res = await fetch(`${API_BASE}/products`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
})

export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const res = await fetch(`${API_BASE}/products/categories`)
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
})

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    categories: [],
    status: 'idle',      // 'idle' | 'loading' | 'succeeded' | 'failed'
    catStatus: 'idle',
    error: null,
    catError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // products
      .addCase(fetchProducts.pending, (state) => { state.status = 'loading' })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.status = 'succeeded'; state.items = action.payload })
      .addCase(fetchProducts.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message })

      // categories
      .addCase(fetchCategories.pending, (state) => { state.catStatus = 'loading' })
      .addCase(fetchCategories.fulfilled, (state, action) => { state.catStatus = 'succeeded'; state.categories = action.payload })
      .addCase(fetchCategories.rejected, (state, action) => { state.catStatus = 'failed'; state.catError = action.error.message })
  }
})

export default productsSlice.reducer
