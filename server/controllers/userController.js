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

            const createUser = await db.query("insert into users_tbl(username,email,password,role) values($1,$2,$3,'user') returning user_id,email, username, role"
                , [username, email, password]);

            res.status(201).json({
                user: createUser.rows[0],
                token: jwt.sign({ user: createUser.rows, }, process.env.JWT, { expiresIn: "4d" }),
                status: "success"
            });
        }
        else res.status(400).json({ message: "duplicate user", status: "error" });

    } catch (error) {
        res.status(400).send(error.message);
    }
}
// POST /user/login
export const login = async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) res.status(400).send("invalid data");
    try {
        const user = await db.query("select * from users_tbl where email = $1", [email]);
        if (user.rowCount != 0) {
            if (await bcrypt.compare(password, user.rows[0].password)) {
                user.rows[0].password = null;
                res.status(200).json({
                    user: user.rows[0],
                    token: jwt.sign({ user: user.rows, }, process.env.JWT, { expiresIn: "4d" }),
                    status: "success"
                });
            } else res.status(404).json({ message: "incorect credentials", status: "error" });
        } else res.status(404).json({ message: "incorect credentials", status: "error" });
    } catch (error) {
        res.json({ message: error.message, status: "error" });
    }
}
export const getUser = async (req, res) => {

}
export const changeUserRole = async (req, res) => { }
export const deleteUser = async (req, res) => {
    console.log(req.user)
    res.send();
}