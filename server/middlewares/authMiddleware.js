import jwt from "jsonwebtoken";
import db from "../config/db.js";

export const authMiddleware = async (req, res, next) => {
    if (req.header('authorization') && req.header('authorization').startsWith("Bearer")) {
        try {
            let token = req.header('authorization').split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT);
            const user = decoded.user;
            const getUser = await db.query("SELECT * FROM users_tbl WHERE user_id = $1", [user.user_id]);
            if (getUser.rowCount == 0) return next(res.status(404));

            req.user = getUser.rows[0];
        } catch (error) {
            return next(res.status(404).json({ message: error.message, status: "Failed" }));
        }
        next();
    } else {
        return next(res.status(401).json({ message: "no token" }));
    };
}