import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: {} }, // { id: { product, qty } }
  reducers: {
    addToCart: (state, action) => {
      const p = action.payload
      const id = p.id
      if (!state.items[id]) state.items[id] = { product: p, qty: 0 }
      state.items[id].qty += 1
    },
    setQty: (state, action) => {
      const { id, qty } = action.payload
      if (state.items[id]) {
        state.items[id].qty = Math.max(0, qty)
        if (state.items[id].qty === 0) delete state.items[id]
      }
    },
    removeFromCart: (state, action) => {
      delete state.items[action.payload]
    },
    clearCart: (state) => { state.items = {} },
  },
})

export const { addToCart, setQty, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
