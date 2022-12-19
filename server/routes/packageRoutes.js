import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { protectedMiddleware } from "../middlewares/protectedMiddleware.js";
import { getAllRecent } from "../controllers/packageController.js";

const router = express.Router();

router.get("/package/me/recent", authMiddleware, getAllRecent)

export default router;