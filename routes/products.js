import express from "express";
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
} from "../controllers/products.controller.js";

const router = express.Router();

router.get("/all", getAllProducts);

router.get("/product/:id", getProductById);

router.get("/productsByCategory", getProductsByCategory);

export default router;
