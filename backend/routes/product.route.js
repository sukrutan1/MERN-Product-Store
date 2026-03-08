import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";
import {
  creeateProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
const router = express.Router();

router.get("/", getProducts);
router.post("/", creeateProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

export default router;
