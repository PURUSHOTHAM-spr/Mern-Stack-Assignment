import exp from "express";
import { productModel } from "./Models/productModel.js";

export const productApp = exp.Router();

// get product data
productApp.get("/products",async(req,res)=> {
    let productList = await productModel.find({})
    res.json({message:"Products data retrived successfully",productList})
})

// get product using id
productApp.get("/products/:id",async(req,res)=> {
    let id = req.params.id;
    let reqProduct = await productModel.findById(id);
    res.json({message:"product found",reqProduct})
})

// create new product data in db
/*
productApp.post("/products",async(req,res)=>{
    let newProduct = req.body;
    let newProductDoc = new productModel(newProduct);
    await newProductDoc.save();
    res.json({ message: "Product created successfully" })
})
    */
   productApp.post("/products",async(req,res)=>{
    let newProduct = req.body;
    
    let newProductDoc = new productModel(newProduct);
    await newProductDoc.save();
    res.json({ message: "Product created successfully" })
})

// update an existing product 
productApp.put("/products/:id",async(req,res)=> {
    let id=req.params.id;
    let updatedProduct = req.body;
    let newProduct = await productModel.findByIdAndUpdate(id,{...updatedProduct},{new:true,runValidators:true});
    res.json({message:"product updated successfully",newProduct})
})