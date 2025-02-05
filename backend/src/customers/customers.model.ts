import * as fs from "fs/promises";
import * as productModel from "../products/products.model";

import { Product } from "../products/products.model";

const CUSTOMERS_FILE = "./data/customers.json";

interface Customer {
  customerId: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  basket: ProductItem[];
}

type ProductItem = {
  productId: number;
  name: string;
  img: string;
  type: string;
  gender: string;
  brand: string;
  size: string;
  price: number;
  new: boolean;
  discount: boolean;
  quantity: number;
};

type BasketItem = {
  productId: number;
  name: string;
  img: string;
  type: string;
  gender: string;
  brand: string;
  size: string;
  price: number;
  new: boolean;
  discount: boolean;
  quantity: number;
};

// return all customer from file
export async function getAll(): Promise<Customer[]> {
  try {
    let customersTxt = await fs.readFile(CUSTOMERS_FILE, "utf8");
    let customers = JSON.parse(customersTxt) as Customer[];
    return customers;
  } catch (err: any) {
    if (err.code === "ENOENT") {
      // file does not exits
      await save([]); // create a new file with ampty array
      return []; // return empty array
    } // // cannot handle this exception, so rethrow
    else throw err;
  }
}

export async function createBasket(customerId: number): Promise<void> {
  let customerArray = await getAll();
  let index = findCustomerById(customerArray, customerId);
  if (index === -1)
    throw new Error(`Customer with ID: ${customerId} doesn't exist`);
  customerArray[index].basket = [];
  await save(customerArray);
}

export async function putProductInBasket(
  customerId: number,
  productId: number,
  gender: string,
  size: string
) {
  let customerArray = await getAll();
  let index = findCustomerById(customerArray, customerId);
  if (index === -1)
    throw new Error(`Customer with ID: ${customerId} doesn't exist`);

  const productIndex = customerArray[index].basket.findIndex(
    (currProduct: ProductItem) =>
      currProduct.productId === productId &&
      currProduct.gender === gender &&
      currProduct.size === size
  );

  const product = await productModel.getByID(productId);

  if (productIndex === -1) {
    const productItem = { ...product, gender, size, quantity: 1 };
    customerArray[index].basket.push(productItem);
  } else {
    customerArray[index].basket[productIndex] = {
      ...customerArray[index].basket[productIndex],
      quantity: customerArray[index].basket[productIndex].quantity + 1,
    };
  }

  await save(customerArray);
}

export async function removeProductFromBasket(
  customerId: number,
  productId: number
) {
  let customerArray = await getAll();
  let index = findCustomerById(customerArray, customerId);
  if (index === -1)
    throw new Error(`Customer with ID: ${customerId} doesn't exist`);
  let productIndex = customerArray[index].basket.findIndex(
    (currProduct) => currProduct.productId === productId
  );
  if (productIndex === -1)
    throw new Error(`Product with ID: ${productId} not in basket`);
  customerArray[index].basket.splice(productIndex, 1);
  await save(customerArray);
}

// save array of customers to file
async function save(customers: Customer[] = []) {
  let customersTxt = JSON.stringify(customers);
  await fs.writeFile(CUSTOMERS_FILE, customersTxt);
}

// test function for customer ID
function findCustomerById(customerArray: Customer[], Id: number): number {
  return customerArray.findIndex(
    (currCustomer) => currCustomer.customerId === Id
  );
}
function findCustomerByUsername(
  customerArray: Customer[],
  username: string
): number {
  return customerArray.findIndex(
    (currCustomer) => currCustomer.userName === username
  );
}

export async function updateBasket(customerId: number, basket: BasketItem[]) {
  let customerArray = await getAll();
  let index = findCustomerById(customerArray, customerId);

  customerArray[index].basket = basket.map((item) => ({
    ...item,
    gender: item.gender[0],
    size: item.size[0],
  }));
  await save(customerArray);
}

// get gustomer by ID
export async function getByID(customerId: number) {
  let customerArray = await getAll();
  let index = findCustomerById(customerArray, customerId);
  if (index === -1)
    throw new Error(`Customer with ID:${customerId} doesn't exist`);
  else return customerArray[index];
}

export async function getByUsername(username: string) {
  let customerArray = await getAll();
  let index = findCustomerByUsername(customerArray, username);
  if (index === -1) {
    throw new Error(`Customer with username:${username} doesn't exist`);
  } else {
    return customerArray[index];
  }
}

export async function login(username: string, password: string) {
  let customerArray = await getAll();
  let index = findCustomerByUsername(customerArray, username);
  if (index === -1) return `${username} doesn't exist`;
  if (customerArray[index].password !== password) {
    return "username and password don't match";
  }
  return "Hi, " + customerArray[index].userName;
}

// create a new customer
export async function add(newCustomer: Customer) {
  let customerArray = await getAll();
  if (findCustomerById(customerArray, newCustomer.customerId) !== -1)
    throw new Error(
      `Customer with Id:${newCustomer.customerId} already exists`
    );
  customerArray.push(newCustomer);
  await save(customerArray);
}

// update existing customer
export async function update(customerId: number, customer: Customer) {
  let customerArray = await getAll();
  let index = findCustomerById(customerArray, customerId); // findIndex
  if (index === -1)
    throw new Error(`Customer with ID:${customerId} doesn't exist`);
  else {
    customerArray[index] = customer;
    await save(customerArray);
  }
}

// delete existing customer
export async function remove(customerId: number) {
  let customerArray = await getAll();
  let index = findCustomerById(customerArray, customerId); // findIndex
  if (index === -1)
    throw new Error(`Customer with ID:${customerId} doesn't exist`);
  else {
    customerArray.splice(index, 1); // remove customer from array
    await save(customerArray);
  }
}
