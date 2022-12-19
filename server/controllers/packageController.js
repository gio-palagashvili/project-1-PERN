import db from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

//GET /package/me/recent
const getAllRecent = async (req, res) => {
    const user = req.user;
    try {
        const packages = await db.query("SELECT * FROM packages_tbl WHERE user_id = $1 ORDER BY user_id DESC LIMIT 20", [user.user_id]);
        res.status(200).json({ packages: packages.rows, status: "success" });
    } catch (error) {
        res.status(400).json({ "message": error.message });
    }
}

export { getAllRecent }