import express from "express";
import { addCategory } from "../controllers/categories.controller.js";

const router = express.Router();

router.post("/add", addCategory);

export default router;
