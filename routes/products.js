import express from "express";
import {
  addProduct,
  addVariant,
  bestSellerProducts,
  deleteProduct,
  deleteVariant,
  editDetails,
  getAllProducts,
  getBackPacks,
  getLeastProducts,
  getMensProducts,
  getProductById,
  getProductsByCategory,
  getProductsByFilter,
  getProductsByQuery,
  getWomensProducts,
  newProducts,
  onSaleProducts,
  updateVariantQuantity,
  uploadImages,
} from "../controllers/products.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

router.post("/add", addProduct);
router.post("/image/upload", uploadImages);

router.get("/all", getAllProducts);

router.get("/product/:id", getProductById);

router.get("/productsByCategory", getProductsByCategory);

router.get("/searchByQuery", getProductsByQuery);

router.get("/newArrivals", newProducts);

router.get("/bestSellerProducts", bestSellerProducts);

router.get("/onSaleProducts", onSaleProducts);

router.get("/womens", getWomensProducts);

router.get("/mens", getMensProducts);

router.get("/backpacks", getBackPacks);

router.get("/getLeastSold", getLeastProducts);

//Admin

router.get("/getProductsByFilter", getProductsByFilter);

router.put("/updateQuantity", updateVariantQuantity);

router.put("/deleteVariant", deleteVariant);

router.put("/addVariant", addVariant);

router.put("/editDetails", editDetails);

router.delete("/delete", verifyToken, isAdmin, deleteProduct);

export default router;
