import { Request, Response } from "express";
import * as productModel from "./products.model";

export async function getAllProducts(req: Request, res: Response): Promise<void> {
  try {
    let { gender, type, brand, size, new: isNew, discount } = req.query; // Extracting query parameters
    
    // Filtering products based on query parameters
    let genderQuery = gender as string | undefined;
    let typeQuery = type as string | undefined;
    let brandQuery = brand as string | undefined;
    let sizeQuery = size as string | undefined;
    let isNewQuery: boolean | undefined =
      isNew !== undefined ? (isNew as string).toLowerCase() === "true" : undefined;
    let discountQuery: boolean | undefined =
      discount !== undefined ? (discount as string).toLowerCase() === "true" : undefined;

    let filteredProducts = await productModel.getAll();

    if (genderQuery) {
      filteredProducts = filteredProducts.filter(product =>
        product.gender.includes(genderQuery)
      );
    }

    if (typeQuery) {
      filteredProducts = filteredProducts.filter(
        product => product.type.toLowerCase() === typeQuery.toLowerCase()
      );
    }

    if (brandQuery) {
      filteredProducts = filteredProducts.filter(
        product => product.brand.toLowerCase() === brandQuery.toLowerCase()
      );
    }

    if (sizeQuery) {
      filteredProducts = filteredProducts.filter(product =>
        product.size.includes(sizeQuery)
      );
    }

    if (isNewQuery !== undefined) {
      filteredProducts = filteredProducts.filter(
        product => product.new === isNewQuery
      );
    }

    if (discountQuery !== undefined) {
      filteredProducts = filteredProducts.filter(
        product => product.discount === discountQuery
      );
    }

    res.json(filteredProducts);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send("An unknown error occurred");
    }
  }
}

export async function getRecommendedProducts(req: Request, res: Response) {
  try {
    let allProducts = await productModel.getAll();
    let recommendProducts = allProducts.filter(
      (product) => product.new === true && product.discount === true
    );
    res.json(recommendProducts);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send("An unknown error occurred");
    }
  }
}

// async function postProduct(req, res) {
//   try {
//     let newProduct = req.body;
//     await productModel.add(newProduct);
//     res.end();
//   } catch (error) {
//     // res.statusMessage=
//     res.status(400).send(error.message);
//   }
// }

export async function getProduct(req: Request, res: Response) {
  try {
    let id = parseInt(req.params.id);
    let product = await productModel.getByID(id);
    res.json(product);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send("An unknown error occurred");
    }
  }
}

// async function putProduct(req, res) {
//   try {
//     let id = parseInt(req.params.id);
//     let product = req.body;
//     await productModel.update(id, product);
//     res.end();
//   } catch (error) {
//     // res.statusMessage=
//     res.status(400).send(error.message);
//   }
// }

// async function deleteProduct(req, res) {
//   try {
//     let id = parseInt(req.params.id);
//     await productModel.remove(id);
//     res.end();
//   } catch (error) {
//     // res.statusMessage=
//     res.status(400).send(error.message);
//   }
// }
