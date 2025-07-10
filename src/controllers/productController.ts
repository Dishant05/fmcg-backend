import { Request, Response } from "express";
import Product from "../models/productModel";

export const createProduct = (req: Request, res: Response) => {
  Product.create(req.body)
    .then((product) => {
      res.status(201).json({ message: "Product created", product });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error creating product", error: err.message });
    });
};

export const getProducts = (req: Request, res: Response) => {
  const {
    category,
    minPrice,
    maxPrice,
    name,
    page = 1,
    limit = 10,
  } = req.query;

  const filter: any = {};

  if (category) filter.category = category;
  if (name) filter.name = { $regex: name, $options: "i" };

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);

    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  Product.find(filter)
    .skip((+page - 1) * +limit)
    .limit(+limit)
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error fetching products", error: err.message });
    });
};

export const getProductById = (req: Request, res: Response) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product)
        return res.status(404).json({ message: "Product not Found" });
      res.json(product);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error fetching product", error: err.message });
    });
};

export const updateProduct = (req: Request, res: Response) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updated) => {
      if (!updated)
        return res.status(404).json({ message: "Product not Found" });
      res.json({ message: "Product updated", product: updated });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error updating product", error: err.message });
    });
};

export const deleteProduct = (req: Request, res: Response) => {
  Product.findByIdAndDelete(req.params.id)
    .then((deleted) => {
      if (!deleted)
        return res.status(404).json({ message: "Product not found" });
      res.json({ message: "Product Deleted" });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error Deleting product", error: err.message });
    });
};
