import express from "express";
import {
  getAllProducts,
  getProductById,
} from "../controllers/products.controller.js";

const router = express.Router();

router.get("/all", getAllProducts);

router.get("/product/:id", getProductById);

export default router;
