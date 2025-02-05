import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState } from "react";

import { FilterMenu } from "../components/FilterMenu";
import { NewItemsCarousel } from "../components/NewItemsCarousel";
import { Product } from "../interfaces/products";
import { ProductList } from "../components/ProductList";

interface HomeProps {
  addToCart: (product: Product) => void;
}

export const Home: React.FC<HomeProps> = ({ addToCart }) => {
  const [filters, setFilters] = useState({
    gender: "",
    type: "",
    brand: "",
    size: "",
  });

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  return (
    <div className="Home">
      <hr />
      <h1 className="carousel-title">Newly Added Products</h1>
      <NewItemsCarousel />
      <hr />
      <h1>All Products</h1>
      <FilterMenu onChange={handleFilterChange} />
      <ProductList filters={filters} addToCart={addToCart} />
    </div>
  );
};
