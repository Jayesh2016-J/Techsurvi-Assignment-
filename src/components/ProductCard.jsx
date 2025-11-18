// src/components/ProductCard.jsx
import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Card = styled.div`
  border: 1px solid #e6e9ee;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  cursor: pointer;
  height: 100%;
`

const Img = styled.img`height: 180px; object-fit: contain; margin-bottom: 8px; width:100%`

const Title = styled.div`font-size:14px; font-weight:500; color:#0f172a;`
const Category = styled.div`font-size:12px; color:#6b7280; margin-top:6px;`
const PriceRow = styled.div`display:flex; justify-content:space-between; align-items:center; margin-top:8px;`

export default function ProductCard({ product }) {
  const nav = useNavigate()
  return (
    <Card onClick={() => nav(`/product/${product.id}`)}>
      <div>
        <Img src={product.image} alt={product.title} />
        <Title>{product.title.length > 70 ? product.title.slice(0,70) + '...' : product.title}</Title>
        <Category>{product.category}</Category>
      </div>
      <PriceRow>
        <div style={{fontWeight:700}}>₹{(product.price*80).toFixed(0)}</div>
        <button style={{background:'#0ea5e9', color:'white', padding:'6px 10px', borderRadius:6, border:'none'}}>View</button>
      </PriceRow>
    </Card>
  )
}
