import express from "express";
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getProductsByQuery,
} from "../controllers/products.controller.js";

const router = express.Router();

router.get("/all", getAllProducts);

router.get("/product/:id", getProductById);

router.get("/productsByCategory", getProductsByCategory);

router.get("/searchByQuery", getProductsByQuery);

export default router;
