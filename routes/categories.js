import express from "express";
import {
  addCategory,
  getCategory,
} from "../controllers/categories.controller.js";

const router = express.Router();

router.post("/add", addCategory);

router.get("/get", getCategory);

export default router;
