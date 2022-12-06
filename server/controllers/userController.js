import db from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

// post /user/register
export const register = async (req, res) => {
    let { email, password, username } = req.body;
    if (!username || !email || !password) res.status(400).send("invalid data");
    try {
        const user = await db.query("SELECT FROM users_tbl WHERE email = $1", [email]);

        if (user.rowCount == 0) {
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);

            const createUser = await
                db.query("insert into users_tbl(username,email,password,role) values($1,$2,$3,'user') returning user_id,email, username, role"
                    , [username, email, password]);
            delete createUser.rows[0].password;

            res.status(200).json({
                token: jwt.sign({ user: createUser.rows[0], }, process.env.JWT, { expiresIn: "4d" }),
                user: createUser.rows[0],
                status: "success"
            });

        }
        else res.status(400).json({ message: "duplicate user", status: "failed" });

    } catch (error) {
        res.status(400).json(error.message);
    }
}
// POST /user/login
export const login = async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) res.status(400).json({ message: "invalid data", status: "failed" });
    try {
        const user = await db.query("select * from users_tbl where email = $1", [email]);
        if (user.rowCount != 0) {
            if (await bcrypt.compare(password, user.rows[0].password)) {
                delete user.rows[0].password;
                res.status(200).json({
                    token: jwt.sign({ user: user.rows[0], }, process.env.JWT, { expiresIn: "4d" }),
                    user: user.rows[0],
                    status: "success"
                });
            } else res.status(404).json({ message: "incorect credentials", status: "failed" });
        } else res.status(404).json({ message: "incorect credentials", status: "failed" });
    } catch (error) {
        res.json({ message: error.message, status: "error" });
    }
}
//POST PROTECTED /user/:id
export const getUser = async (req, res) => {
    if (req.user.role === "admin") {
        const user = await db.query("SELECT * FROM users_tbl WHERE user_id = $1", [req.params.id]);
        if (user.rowCount > 0) {
            delete user.rows[0].password;
            res.status(401).json({ status: "successful", user: user.rows[0] });
        } else {
            res.status(404).json({ status: "Failed", message: "No user found" });
        }
    } else {
        res.status(401).json({ status: "Failed", message: "not authorized" });
    }
}
//GET AUTH /user/me
export const getCurrentUser = async (req, res) => {
    res.status(200).json({ user: req.user, status: "successful" })
}

export const changeUserRole = async (req, res) => { }
export const deleteUser = async (req, res) => {
    res.send();
}