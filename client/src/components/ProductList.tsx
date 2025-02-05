import "../App.css";

import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Product } from "../interfaces/products";
import { useFetchProducts } from "../hooks/useFetchProducts";

interface Props {
  filters: {
    gender: string;
    type: string;
    brand: string;
    size: string;
  };
  addToCart?: (product: Product) => void;
}

export const ProductList: React.FC<Props> = ({ filters }) => {
  const query = new URLSearchParams(
    filters as Record<string, string>
  ).toString();
  const { products, loading, error } = useFetchProducts({ query });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="card-deck">
      {products.length > 0 ? (
        products.map((product) => (
          <Link
            key={product.productId}
            to={`/products/${product.productId}`}
            style={{ textDecoration: "none" }}
          >
            <div key={product.productId} className="card">
              <div>
                <span className="price-label">{product.price} DKK</span>
                <span className="brand-label">{product.brand}</span>
                <img
                  src={product.img}
                  alt={product.name}
                  className="card-img-top"
                />
              </div>
              <h5 className="card-title">{product.name}</h5>
              <div className="card-body">
                <span
                  className="btn btn-primary mx-auto view-product-btn"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  SEE DETAILS
                </span>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className="no-match-message">
          No products match the selected filters.
        </p>
      )}
    </div>
  );
};
