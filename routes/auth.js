import express from "express";
import { login, signup, checkAuth } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

router.get("/check-auth", verifyToken, isAdmin, checkAuth);

router.post("/signup", signup);

router.post("/login", login);

export default router;
