import express from "express";
import {
  postCustomer,
  login,
  getAllCustomers,
  getCustomerBasket,
  createBasket,
  putProductInBasket,
  removeProductFromBasket,
} from "./customers.controler";

export const customersRouter = express.Router();

// Middleware to parse JSON bodies specifically for this router
customersRouter.use(express.json());

customersRouter.post("/customers", postCustomer);
customersRouter.post("/login", login);
customersRouter.get("/customers", getAllCustomers);
customersRouter.get("/customers/:id", getCustomerBasket);
customersRouter.post("/customers/:id", createBasket);
customersRouter.put(
  "/customers/:customerId/basket/:productId",
  putProductInBasket
);
customersRouter.delete(
  "/customers/:customerId/basket/:productId",
  removeProductFromBasket
);
