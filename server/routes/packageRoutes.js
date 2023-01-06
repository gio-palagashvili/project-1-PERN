import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { protectedMiddleware } from "../middlewares/protectedMiddleware.js";
import { getAllRecent, createPackage } from "../controllers/packageController.js";

const router = express.Router();

export default router
    .get("/package/me/recent", authMiddleware, getAllRecent)
    .post("/package/create", protectedMiddleware, createPackage)
