import { getAllCategories } from "./categories.controler";

import express from "express";

export const categoriesRouter = express.Router();
categoriesRouter.use(express.json());

categoriesRouter.get("/categories", getAllCategories);
