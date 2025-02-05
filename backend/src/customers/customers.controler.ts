import * as customerModel from "./customers.model";

import { Request, Response } from "express";

export async function getAllCustomers(req: Request, res: Response) {
  try {
    let allCustomers = await customerModel.getAll();
    res.json(allCustomers);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send("An unknown error occurred");
    }
  }
}

export async function postCustomer(req: Request, res: Response) {
  try {
    let newCustomer = req.body;
    await customerModel.add(newCustomer);
    res.json(newCustomer);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send("An unknown error occurred");
    }
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { userName, password } = req.body;
    const customer = await customerModel.login(userName, password);
    res.send(customer);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send("An unknown error occurred");
    }
  }
}

async function getCustomer(req: Request, res: Response) {
  try {
    let id = parseInt(req.params.id);
    let customer = await customerModel.getByID(id);
    res.json(customer);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send("An unknown error occurred");
    }
  }
}

export async function getCustomerBasket(req: Request, res: Response) {
  try {
    let id = parseInt(req.params.id);
    let customer = await customerModel.getByID(id);
    res.json(customer.basket);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send("An unknown error occurred");
    }
  }
}

export async function putProductInBasket(req: Request, res: Response) {
  try {
    let customerId = parseInt(req.params.customerId);
    let productId = parseInt(req.params.productId);
    let gender = req.body.gender;
    let size = req.body.size;
    await customerModel.putProductInBasket(customerId, productId, gender, size);
    let customer = await customerModel.getByID(customerId);
    res.json(customer);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send("An unknown error occurred");
    }
  }
}

export async function checkout(req: Request, res: Response) {
  try {
    const { user, basket } = req.body;

    if (!user || !basket) {
      return res.status(400).send("Missing user or basket in request body");
    }

    const customer = await customerModel.getByUsername(user);

    if (!customer) {
      return res.status(404).send("Customer not found");
    }

    await customerModel.updateBasket(customer.customerId, basket);

    res.json(customer);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
}

export async function removeProductFromBasket(req: Request, res: Response) {
  try {
    let customerId = parseInt(req.params.customerId);
    let productId = parseInt(req.params.productId);
    await customerModel.removeProductFromBasket(customerId, productId);
    let customer = await customerModel.getByID(customerId);
    res.json(customer);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send("An unknown error occurred");
    }
  }
}

export async function createBasket(req: Request, res: Response) {
  try {
    let id = parseInt(req.params.id);
    await customerModel.createBasket(id);
    let customer = await customerModel.getByID(id);
    res.json(customer);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send("An unknown error occurred");
    }
  }
}

async function putCustomer(req: Request, res: Response) {
  try {
    let id = parseInt(req.params.id);
    let customer = req.body;
    await customerModel.update(id, customer);
    res.end();
  } catch (error) {
    // res.statusMessage=
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send("An unknown error occurred");
    }
  }
}

async function deleteCustomer(req: Request, res: Response) {
  try {
    let id = parseInt(req.params.id);
    await customerModel.remove(id);
    res.end();
  } catch (error) {
    // res.statusMessage=
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send("An unknown error occurred");
    }
  }
}
