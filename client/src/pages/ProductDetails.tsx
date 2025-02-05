import "../assets/styles/product.css";

import React, { useEffect, useState } from "react";

import { Product } from "../interfaces/products";
import { useParams } from "react-router-dom";

type CartEntryProps = {
  customerId: number;
  productId: number;
  name: string;
  img: string;
  price: number;
  gender: string;
  size: string;
  quantity: number;
};

interface ProductDetailsProps {
  addToCart: (product: Product) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  addToCart,
}) => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [cartEntry, setCartEntry] = useState<CartEntryProps>({
    customerId: 1,
    productId: -1,
    name: "",
    img: "",
    price: 0,
    gender: "",
    size: "",
    quantity: 1,
  });

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setCartEntry((prevCartEntry: CartEntryProps) => ({
          ...prevCartEntry,
          productId: Number(id),
          name: data.name,
          img: data.img,
          price: data.price,
          gender: data.gender[0],
          size: data.size[0],
        }));
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    addToCart({
      ...product,
      gender: [cartEntry.gender],
      size: [cartEntry.size],
      quantity: cartEntry.quantity,
    });
  };

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCartEntry((prevCartEntry) => ({
      ...prevCartEntry,
      [name]: value,
    }));
  };

  return (
    <main className="overview">
      <div className="product">
        <img
          id="productImage"
          src={product?.img}
          alt="Product"
          className="product-image"
        />
        <div className="product-details">
          <h2 id="productTitle">{product?.name}</h2>
          <div className="product-description">
            <p>
              <b>Brand:</b> {product?.brand}
            </p>
            <p>
              <b>Type:</b> {product?.type}
            </p>
            <div id="productGender">
              <b>Gender:</b>{" "}
              <select
                name="gender"
                value={cartEntry.gender}
                onChange={handleSelectionChange}
              >
                {product?.gender.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <div
              id="productSize"
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              <b>Size:</b>{" "}
              <select
                name="size"
                value={cartEntry.size}
                onChange={handleSelectionChange}
              >
                {product?.size.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p>
            <b>Price:</b> {product?.price} DKK
          </p>
          <div className="d-flex flex-column align-items-center col-md-12 mb-2">
            <button
              className="btn btn-success btn-block mb-2"
              type="button"
              id="addItemButton"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className="btn btn-secondary btn-block"
              type="button"
              onClick={() => window.history.back()}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
