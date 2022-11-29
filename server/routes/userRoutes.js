import express from "express";
import { deleteUser, login, register } from "../controllers/userController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

export default router
    .post("/user/register", register)
    .delete("/delete/:id", authMiddleware, deleteUser)
    .post("/user/login", login);
