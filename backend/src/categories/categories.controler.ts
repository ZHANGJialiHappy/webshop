import { Request, Response } from "express";
import * as productModel from "./categories.model";

export async function getAllCategories(
  req: Request,
  res: Response
): Promise<void> {
  try {
    let allProducts = await productModel.getAll();
    let categories = allProducts.map((product) => product.type);
    categories = [...new Set(categories)];
    res.json(categories);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send("An unknown error occurred");
    }
  }
}
