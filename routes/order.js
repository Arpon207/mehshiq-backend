import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  handleUpdateStatus,
  trackOrder,
  getDashboardMetrics,
} from "../controllers/orders.controller.js";

const router = express.Router();

router.post("/create", createOrder);

router.get("/all", getOrders);

router.get("/getOrderById", getOrderById);

router.put("/handleStatus", handleUpdateStatus);

router.get("/track", trackOrder);

router.get("/dashboard-metrics", getDashboardMetrics);

export default router;
