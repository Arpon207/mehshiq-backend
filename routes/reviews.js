import express from "express";
import { addReview, getAllReviews } from "../controllers/reviews.controller.js";

const router = express.Router();

router.post("/addReview", addReview);

router.get("/all", getAllReviews);

export default router;
