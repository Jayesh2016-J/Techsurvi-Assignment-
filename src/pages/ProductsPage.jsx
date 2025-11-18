import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchProducts } from "../redux/productsSlice";
import ProductCard from "../components/ProductCard";

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 16px;
`;

const FiltersBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  position: relative;   /* Clear button alignment */
  padding-right: 90px;  /* space for right-side button */
  margin-bottom: 22px;
`;

const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #bdbdbd;
`;

const Select = styled.select`
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #bdbdbd;
`;

const ClearBox = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
`;

const Button = styled.button`
  padding: 8px 16px;
  background: #0ea5e9;
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
`;

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((s) => s.products);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("99999");
  const [sort, setSort] = useState("none");

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  // Clear All Filters
  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setMinPrice("0");
    setMaxPrice("99999");
    setSort("none");
  };

  const filtered = items
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (category === "all" ? true : p.category === category))
    .filter((p) => p.price >= Number(minPrice) && p.price <= Number(maxPrice))
    .sort((a, b) => {
      if (sort === "low-high") return a.price - b.price;
      if (sort === "high-low") return b.price - a.price;
      return 0;
    });

  return (
    <Container>
      <h2 style={{ marginBottom: 12 }}>Products</h2>


      <FiltersBox>
        <FilterItem>
          <label>Search</label>
          <Input
            value={search}
            placeholder="Search title..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </FilterItem>

        <FilterItem>
          <label>Category</label>
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All</option>
            <option value="men's clothing">Men</option>
            <option value="women's clothing">Women</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
          </Select>
        </FilterItem>

        <FilterItem>
          <label>Min Price (₹)</label>
          <Input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </FilterItem>

        <FilterItem>
          <label>Max Price (₹)</label>
          <Input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </FilterItem>

        <FilterItem>
          <label>Sort</label>
          <Select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="none">None</option>
            <option value="low-high">Price: Low → High</option>
            <option value="high-low">Price: High → Low</option>
          </Select>
        </FilterItem>

     
        <ClearBox>
          <Button onClick={clearFilters}>Clear</Button>
        </ClearBox>
      </FiltersBox>

      <div style={{ marginBottom: 12, color: "#555" }}>
        {filtered.length} results
      </div>

    
      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div style={{ color: "#dc2626" }}>Error: {error}</div>}
      {status === "succeeded" && (
        <Grid>
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Grid>
      )}
    </Container>
  );
}
