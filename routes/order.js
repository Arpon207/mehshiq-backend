import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  handleUpdateStatus,
  trackOrder,
  getDashboardMetrics,
} from "../controllers/orders.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

router.post("/create", createOrder);

router.get("/all", verifyToken, isAdmin, getOrders);

router.get("/getOrderById", getOrderById);

router.put("/handleStatus", handleUpdateStatus);

router.get("/track", trackOrder);

router.get("/dashboard-metrics", getDashboardMetrics);

export default router;
