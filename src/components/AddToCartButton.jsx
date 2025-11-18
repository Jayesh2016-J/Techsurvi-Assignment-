import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { addToCart } from '../redux/cartSlice'

const Btn = styled.button`
  background:#16a34a; color:white; padding:10px 14px; border-radius:8px; border:none; cursor:pointer;
`

export default function AddToCartButton({product}){
  const dispatch = useDispatch()
  return <Btn onClick={()=>dispatch(addToCart(product))}>Add to Cart</Btn>
}
