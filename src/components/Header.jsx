import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const Wrap = styled.header`
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
`
const Container = styled.div`
  max-width: 1100px; margin: 0 auto; padding: 16px;
  display:flex; justify-content:space-between; align-items:center;
`
const Brand = styled(Link)`font-weight:700; color:#0ea5e9; font-size:20px;`
const Nav = styled.nav`display:flex; gap:12px; align-items:center;`
const Badge = styled.span`
  background:#0ea5e9; color:white; padding:2px 8px; border-radius:8px; font-size:12px;
`

export default function     Header(){
  const items = useSelector(s => s.cart.items)
  const count = Object.values(items).reduce((acc,v)=> acc + v.qty, 0)
  return (
    <Wrap>
      <Container>
        <Brand to="/">Techsurvi Ecom</Brand>
        <Nav>
          <Link to="/">Products</Link>
          <Link to="/cart">Cart <Badge>{count}</Badge></Link>
        </Nav>
      </Container>
    </Wrap>
  )
}
