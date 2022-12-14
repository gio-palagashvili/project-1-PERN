import express from "express";
import { deleteUser, login, register, getUser, getCurrentUser, updateUser } from "../controllers/userController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { protectedMiddleware } from "../middlewares/protectedMiddleware.js";
const router = express.Router();

export default router
    .post("/user/register", register)
    .post("/user/login", login)
    .post("/user/:id", protectedMiddleware, getUser)
    .get("/user/me", authMiddleware, getCurrentUser)
    .patch("/user/update", authMiddleware, updateUser)
    .delete("user/delete/", authMiddleware, deleteUser)