import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      minlength: [4, "Product name is small"],
      maxlength: [16, "Product name is long"],
      required: true
    },
    brand: {
      type: String,
      minlength: [4, "Brand name is short"],
      maxlength: [16, "Brand name is long"],
      required: true
    },
    price: {
      type: Number,
      min: [1, "Price must be at least 1"],
      max: [100000, "Price must be below 100000"],
      required: true
    },
    pid: {
      type: Number,
      min: [1, "PID must be at least 1"],
      required: true
    }
  },
  {
    strict: "throw",
    timestamps: true
  }
);

export const productModel = model("product", productSchema);
