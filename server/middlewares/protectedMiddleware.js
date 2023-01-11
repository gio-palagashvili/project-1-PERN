import jwt from "jsonwebtoken";
import db from "../config/db.js";

export const protectedMiddleware = async (req, res, next) => {
    if (req.header('authorization') && req.header('authorization').startsWith("Bearer")) {
        let token = req.header('authorization').split(" ")[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT);
            const user = decoded.user;
            const getUser = await db.query("SELECT * FROM users_tbl WHERE user_id = $1", [user.user_id]);

            if (getUser.rowCount == 0) return next(res.status(404).json({ message: "no user found", status: "failed" }));
            if (getUser.rows[0].role != "admin") return next(res.status(401).json({ message: "Error 401 : Not authorized", status: "failed" }));

            req.user = getUser.rows[0];
        } catch (error) {
            return next(res.status(404).json({ message: error.message, status: "failed" }));
        }

        next();
    } else {
        return next(res.status(401).json({ message: "no token", status: "failed" }));
    };
}