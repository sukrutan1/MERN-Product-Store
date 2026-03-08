import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
    console.log("error in gel all products:", error.message);
  }
};

export const creeateProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
    return;
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error in create product" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "This product was deleted successfully",
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Product not found" });
    console.log("error in delete products:", error.message);
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "server error" });
    console.log("error in update product:", error.message);
  }
};
