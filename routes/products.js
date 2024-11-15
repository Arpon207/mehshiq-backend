import express from "express";
import {
  bestSellerProducts,
  getAllProducts,
  getMensProducts,
  getProductById,
  getProductsByCategory,
  getProductsByQuery,
  getWomensProducts,
  newProducts,
} from "../controllers/products.controller.js";

const router = express.Router();

router.get("/all", getAllProducts);

router.get("/product/:id", getProductById);

router.get("/productsByCategory", getProductsByCategory);

router.get("/searchByQuery", getProductsByQuery);

router.get("/newArrivals", newProducts);

router.get("/bestSellerProducts", bestSellerProducts);

router.get("/womens", getWomensProducts);

router.get("/mens", getMensProducts);

export default router;
