import express from "express";
import {
  addProduct,
  addVariant,
  bestSellerProducts,
  deleteVariant,
  editDetails,
  getAllProducts,
  getBackPacks,
  getLeastProducts,
  getMensProducts,
  getProductById,
  getProductsByCategory,
  getProductsByQuery,
  getWomensProducts,
  newProducts,
  updateVariantQuantity,
  uploadImages,
} from "../controllers/products.controller.js";

const router = express.Router();

router.post("/add", addProduct);
router.post("/image/upload", uploadImages);

router.get("/all", getAllProducts);

router.get("/product/:id", getProductById);

router.get("/productsByCategory", getProductsByCategory);

router.get("/searchByQuery", getProductsByQuery);

router.get("/newArrivals", newProducts);

router.get("/bestSellerProducts", bestSellerProducts);

router.get("/womens", getWomensProducts);

router.get("/mens", getMensProducts);

router.get("/backpacks", getBackPacks);

router.get("/getLeastSold", getLeastProducts);

router.put("/updateQuantity", updateVariantQuantity);

router.put("/deleteVariant", deleteVariant);

router.put("/addVariant", addVariant);

router.put("/editDetails", editDetails);

export default router;
