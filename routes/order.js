import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  handleUpdateStatus,
} from "../controllers/orders.controller.js";

const router = express.Router();

router.post("/create", createOrder);

router.get("/all", getOrders);

router.get("/getOrderById", getOrderById);

router.put("/handleStatus", handleUpdateStatus);

export default router;
