import db from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

//GET /package/me/recent
const getAllRecent = async (req, res) => {
    const user = req.user;
    try {
        const packages = await db.query("SELECT * FROM packages_tbl WHERE user_id = $1 ORDER BY user_id DESC LIMIT 8",
            [user.user_id]);
        const packagesAmount = await db.query("SELECT COUNT(package_id) FROM packages_tbl WHERE user_id = $1",
            [user.user_id]);
        res.status(200).json({ packages: packages.rows, status: "success", amount: packagesAmount });
    } catch (error) {
        res.status(400).json({ "message": error.message });
    }
}
const createPackage = async (req, res) => {
    const { name, weight, price, code } = req.body;
    try {
        if (!name || !weight || !price || !code) {
            res.status(400);
            throw new Error("Invalid Data");
        }

        const firstName = name.split(" ")[0];
        const lastName = name.split(" ")[1];

        const user = await db.query('SELECT * FROM users_tbl where "firstName" = $1 and "lastName" = $2',
            [firstName, lastName]);
        const checkDupe = await db.query("select * from packages_tbl where code = $1", [code])

        if (checkDupe.rowCount > 0) {
            res.status(400);
            throw new Error("Duplicate tracking code");
        }
        if (user.rowCount > 0) {
            try {
                const insert =
                    await db.query("INSERT INTO packages_tbl(user_id, code, status, name, weight, price) VALUES($1, $2, $3, $4, $5, $6) returning package_id",
                        [user.rows[0].user_id, code, 'In Transit', name, weight, price]);
                res.status(201).json({
                    message: "Package created successfully",
                    status: "success",
                    package_id: insert.rows[0].package_id
                })
            } catch (err) {
                res.status(400).json({ "message": err.message, status: "failed" });
                console.log(err.message)
            }
        } else res.status(400).json({ message: "incorect first or last name", status: "failed" });
    } catch (err) {
        res.status(400).json({ "message": err.message, status: "failed" });
        console.log(err.message)
    }
}

export { getAllRecent, createPackage }