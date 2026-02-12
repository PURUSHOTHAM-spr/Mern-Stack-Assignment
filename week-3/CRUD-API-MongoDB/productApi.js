import exp from "express";
import { productModel } from "./Models/productModel.js";

export const productApp = exp.Router();

// GET all products
productApp.get("/", async (req, res, next) => {
  try {
    const products = await productModel.find();
    res.json({ message: "Products retrieved", products });
  } catch (err) {
    next(err);
  }
});

// GET product by ID
productApp.get("/:id", async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.json({ message: "Product found", product });
  } catch (err) {
    next(err);
  }
});

// CREATE product
productApp.post("/", async (req, res, next) => {
  try {
    const newProduct = new productModel(req.body);
    await newProduct.save();
    res.status(201).json({ message: "Product created" });
  } catch (err) {
    next(err);
  }
});

// UPDATE product
productApp.put("/:id", async (req, res, next) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json({ message: "Product updated", updatedProduct });
  } catch (err) {
    next(err);
  }
});
