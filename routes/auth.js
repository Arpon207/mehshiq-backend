import express from "express";
import {
  login,
  signup,
  checkAuth,
  changePassword,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

router.get("/check-auth", verifyToken, isAdmin, checkAuth);

router.post("/signup", signup);

router.post("/login", login);

router.patch("/change-password", verifyToken, isAdmin, changePassword);

export default router;
