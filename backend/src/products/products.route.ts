import express from "express";
import {
  getAllProducts,
  getRecommendedProducts,
  getProduct,
} from "./products.controller";

export const productsRouter = express.Router();

productsRouter.use(express.json());

productsRouter.get("/products", getAllProducts);
productsRouter.get("/recommended", getRecommendedProducts);
productsRouter.get("/products/:id", getProduct);
