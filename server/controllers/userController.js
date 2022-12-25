import db from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

// post /user/register
export const register = async (req, res) => {
    let { email, password, firstName, lastName } = req.body;
    if (!email || !password || !lastName || !firstName) res.status(400).json({ message: "invalid data", status: "failed" });

    try {
        const user = await db.query('SELECT FROM users_tbl WHERE "firstName" = $1 and "lastName" = $2', [firstName, lastName]);
        if (user.rowCount == 0) {
            const userEmail = await db.query("SELECT FROM users_tbl WHERE email = $1", [email]);
            if (userEmail.rowCount === 0) {
                const salt = await bcrypt.genSalt(10);
                password = await bcrypt.hash(password, salt);

                const createUser = await
                    db.
                        query('insert into users_tbl(email, password, role, "firstName", "lastName") values($1,$2,$3,$4,$5) returning "lastName", "firstName", email, role'
                            , [email, password, 'user', firstName, lastName]);
                // delete createUser.rows[0].password;
                res.status(200).json({
                    token: jwt.sign({ user: createUser.rows[0], }, process.env.JWT, { expiresIn: "4d" }),
                    status: "success"
                });
            } else res.status(400).json({ message: "duplicate email", status: "failed" });
        }
        else res.status(400).json({ message: "duplicate name", status: "failed" });

    } catch (error) {
        res.status(400).json(error.message);
    }
}
// POST /user/login
export const login = async (req, res) => {
    let { email, password } = req.body;
    try {
        const user = await db.query("select * from users_tbl where email = $1", [email]);
        if (user.rowCount != 0) {
            if (await bcrypt.compare(password, user.rows[0].password)) {
                delete user.rows[0].password;
                res.status(200).json({
                    token: jwt.sign({ user: user.rows[0], }, process.env.JWT, { expiresIn: "40d" }),
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
//PATCH AUTH /user/update
export const updateUser = async (req, res) => {
    res.status(200).json({ user: req.user, status: "successful" })
}

export const deleteUser = async (req, res) => {
    res.send();
}