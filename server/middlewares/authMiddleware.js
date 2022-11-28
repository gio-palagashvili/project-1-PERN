import jwt from "jsonwebtoken";
import db from "../config/db.js";

export const authMiddleware = async (req, res, next) => {
    if (req.header('authorization') && req.header('authorization').startsWith("Bearer")) {
        let token = req.header('authorization').split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT);
        const user_id = decoded.user_id;
        const user = db.query("SELECT * FROM users WHERE user_id =$1", [user_id]);

        if (!user) return next(res.status(404).json({ "message": "no user found" }));

        req.user = user;
        next();
    } else {
        return next(res.status(401).json({ "message": "no token" }));
    };
}