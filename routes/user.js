import express from "express";
import { createUser } from "../controllers/users.controller.js";

const router = express.Router();

router.put("/create", createUser);

export default router;
