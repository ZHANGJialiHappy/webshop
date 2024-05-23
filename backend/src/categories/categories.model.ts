import * as fs from "fs/promises";
import { Product } from "../products/products.model";

const PRODUCTS_FILE = "./data/products.json";

// return all product from file
export async function getAll(): Promise<Product[]> {
  try {
    let productsTxt = await fs.readFile(PRODUCTS_FILE, "utf8");
    let products = JSON.parse(productsTxt) as Product[];
    return products;
  } catch (err: any) {
    if (err.code === "ENOENT") {
      // file does not exits
      await save([]); // create a new file with ampty array
      return []; // return empty array
    } // // cannot handle this exception, so rethrow
    else throw err;
  }
}

async function save(products: Product[] = []) {
  let productsTxt = JSON.stringify(products);
  await fs.writeFile(PRODUCTS_FILE, productsTxt);
}
