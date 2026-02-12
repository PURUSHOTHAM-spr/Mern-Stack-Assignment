import { Schema, model } from "mongoose";

// 1. Define Cart Schema
const cartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product' 
    }, 
    quantity: {
        type: Number,
        default: 1
    }      
}, { _id: false }); // Removes the extra _id for cleaner output

// 2. Define User Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    cart: [cartSchema] 
});

export const userModel = model("user", userSchema);