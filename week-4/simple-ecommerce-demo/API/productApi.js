import exp from "express";
import { productModel } from "../Models/productModel.js";

export const productApp = exp.Router();

// 1. GET all products
productApp.get("/products", async (req, res, next) => {
    try {
        let productList = await productModel.find({});
        res.json({ message: "Products retrieved successfully", productList });
    } catch (err) {
        next(err);
    }
});

// 2. POST create a product
productApp.post("/products", async (req, res, next) => {
    try {
        let newProductDoc = new productModel(req.body);
        // save() returns the document that was just saved to the DB
        let savedProduct = await newProductDoc.save();
        
        res.status(201).json({ 
            message: "Product created successfully", 
            payload: savedProduct 
        });
    } catch (err) {
        next(err);
    }
});

// 3. GET product by ID
productApp.get("/products/:id", async (req, res, next) => {
    try {
        let product = await productModel.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product found", product });
    } catch (err) {
        next(err);
    }
});
// 4. PUT update product by ID
productApp.put("/products/:id", async (req, res, next) => {
    try {
        let id = req.params.id;
        let updatedData = req.body;

        // findByIdAndUpdate takes (id, new_data, options)
        let updatedProduct = await productModel.findByIdAndUpdate(
            id,
            { $set: updatedData },
            { new: true, runValidators: true } // 'new: true' returns the modified document
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product updated successfully", payload: updatedProduct });
    } catch (err) {
        next(err);
    }
});

// 5. DELETE product
productApp.delete("/products/:id", async (req, res, next) => {
    try {
        let deletedProduct = await productModel.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted", deletedProduct });
    } catch (err) {
        next(err);
    }
});