import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ProductsPage from './pages/ProductsPage'
import ProductDetails from './pages/ProductDetails'
import CartPage from './pages/CartPage'

export default function App(){
  return (
    <>
      <Header />
      <main style={{padding:'24px 0'}}>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
      <footer style={{textAlign:'center', padding:'18px 0', color:'#6b7280'}}>Built with FakeStore API — Demo</footer>
    </>
  )
}
