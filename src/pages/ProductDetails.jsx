import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchProducts } from "../redux/productsSlice";
import AddToCartButton from "../components/AddToCartButton";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 16px;
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 16px;
`;
const Img = styled.img`
  width: 250px;
  height: 250px;
  object-fit: contain;
`;

const Btn = styled.button`
  background:#16a34a; color:white; padding:10px 14px; border-radius:8px; border:none; cursor:pointer;
`

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((s) => s.products.status);
  const product = useSelector((s) =>
    s.products.items.find((x) => String(x.id) === String(id))
  );

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  if (status === "loading" || !product)
    return <div style={{ padding: 16 }}>Loading...</div>;

  return (
    <Container>
      <div>
        <Img src={product.image} alt={product.title} />
      </div>
      <div>
        <h1>{product.title}</h1>
        <div style={{ color: "#6b7280", marginTop: 6 }}>{product.category}</div>
        <div style={{ fontSize: 28, fontWeight: 800, marginTop: 12 }}>
          ₹{(product.price * 80).toFixed(0)}
        </div>
        <p style={{ marginTop: 12 }}>{product.description}</p>
        <div style={{ marginTop: 12 }}>
          Rating: <strong>{product.rating?.rate ?? "N/A"}</strong> (
          {product.rating?.count ?? 0})
        </div>
        <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
          <AddToCartButton product={product} />
          <Btn onClick={() => navigate("/cart")}>Go to Cart</Btn>
        </div>
      </div>
    </Container>
  );
}
