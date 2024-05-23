import * as fs from "fs/promises";

const PRODUCTS_FILE = "./data/products.json";

export interface Product {
  productId: number;
  name: string;
  img: string;
  type: string;
  gender: string[];
  brand: string;
  size: string[];
  price: number;
  new: boolean;
  discount: boolean;
}
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

// save array of products to file
async function save(products: Product[] = []) {
  let productsTxt = JSON.stringify(products);
  await fs.writeFile(PRODUCTS_FILE, productsTxt);
}

// test function for product ID
function findProduct(productArray: Product[], Id: number): number {
  return productArray.findIndex((currProduct) => currProduct.productId === Id);
}

// get product by ID
export async function getByID(productId: number) {
  let productArray = await getAll();
  let index = findProduct(productArray, productId);
  if (index === -1)
    throw new Error(`Product with ID: ${productId} doesn't exist`);
  else return productArray[index];
}

// create a new product
export async function add(newProduct: Product): Promise<void> {
  let productArray = (await getAll()) || [];
  if (findProduct(productArray, newProduct.productId) !== -1)
    throw new Error(`Product with Id:${newProduct.productId} already exists`);
  productArray.push(newProduct);
  await save(productArray);
}

// update existing product
export async function update(
  productId: number,
  product: Product
): Promise<void> {
  let productArray = await getAll();
  let index = findProduct(productArray, productId); // findIndex
  if (index === -1)
    throw new Error(`Product with ID:${productId} doesn't exist`);
  else {
    productArray[index] = product;
    await save(productArray);
  }
}

// delete existing product
export async function remove(productId: number): Promise<void> {
  let productArray = (await getAll()) || [];
  let index = findProduct(productArray, productId); // findIndex
  if (index === -1)
    throw new Error(`Product with ID:${productId} doesn't exist`);
  else {
    productArray.splice(index, 1); // remove product from array
    await save(productArray);
  }
}
