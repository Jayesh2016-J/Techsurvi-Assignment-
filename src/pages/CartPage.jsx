import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { setQty, removeFromCart, clearCart } from '../redux/cartSlice'
import { Link } from 'react-router-dom'

const Container = styled.div`max-width:900px;margin:0 auto;padding:16px;`
const Item = styled.div`display:flex; gap:12px; align-items:center; border:1px solid #e6e9ee; padding:12px; border-radius:8px; background:white;`

export default function CartPage(){
  const items = useSelector(s => s.cart.items)
  const rows = Object.values(items)
  const dispatch = useDispatch()
  const total = rows.reduce((acc,r)=> acc + r.product.price * r.qty, 0)

  return (
    <Container>
      <h2>Cart</h2>
      {rows.length===0 ? (
        <div style={{padding:24}}>Cart empty. <Link to="/">Shop</Link></div>
      ) : (
        <div style={{display:'flex', flexDirection:'column', gap:12}}>
          {rows.map(r=>(
            <Item key={r.product.id}>
              <img src={r.product.image} alt="" style={{height:80,width:80,objectFit:'contain'}} />
              <div style={{flex:1}}>
                <div style={{fontWeight:600}}>{r.product.title}</div>
                <div style={{color:'#6b7280', marginTop:4}}>₹{(r.product.price*80).toFixed(0)}</div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <button onClick={()=>dispatch(setQty({id:r.product.id, qty: r.qty-1}))}>-</button>
                <div>{r.qty}</div>
                <button onClick={()=>dispatch(setQty({id:r.product.id, qty: r.qty+1}))}>+</button>
              </div>
              <div style={{width:90, textAlign:'right'}}>₹{(r.product.price * r.qty * 80).toFixed(0)}</div>
              <button onClick={()=>dispatch(removeFromCart(r.product.id))} style={{marginLeft:8,color:'#dc2626'}}>Remove</button>
            </Item>
          ))}
          <div style={{display:'flex',justifyContent:'space-between', borderTop:'1px solid #e6e9ee', paddingTop:12}}>
            <div>Total:</div>
            <div style={{fontWeight:800}}>₹{(total*80).toFixed(0)}</div>
          </div>
          <div style={{display:'flex', gap:8}}>
            <button onClick={()=>dispatch(clearCart())}>Clear Cart</button>
            <button>Checkout (demo)</button>
          </div>
        </div>
      )}
    </Container>
  )
}
