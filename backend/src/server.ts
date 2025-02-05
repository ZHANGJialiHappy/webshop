import { categoriesRouter } from "./categories/categories.route";
import cors from "cors";
import { customersRouter } from "./customers/customers.route";
import express from "express";
import { productsRouter } from "./products/products.route";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

// Route handlers for different APIs
app.use(categoriesRouter);
app.use(customersRouter);
app.use(productsRouter);

// Default route
app.get("/", (req, res) => res.send("Server: good URL!"));

// Error handling middleware
app.get("*", (req, res) => {
  res.send("404! This is an invalid URL.");
});

app.listen(PORT, () => {
  console.log("Server listening on Port", PORT);
});
