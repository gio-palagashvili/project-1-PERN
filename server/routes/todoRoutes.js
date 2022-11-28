import express from "express";
import db from "../config/db.js";

const router = express.Router();

router
    .post("/todos", async (req, res) => {
        const description = req.body.description;
        const createTodo = await db.query("insert into todo (description) values ($1) returning *", [description]);
        res.json(createTodo.rows);
    }).get("/todos/:id", async (req, res) => {
        const grabTodo = await db.query("select * from todo where todo_id=$1", [req.params.id]);
        res.json(grabTodo.rows);
    }).put("/todos/:id", async (req, res) => {
        const description = req.body.description;
        const editTodo = await db.query("update todo set description = $2 where todo_id = $1  returning *", [req.params.id, description]);
        res.json(editTodo.rows);
    }).delete("/todos/:id", async (req, res) => {
        const editTodo = await db.query("delete todo where todo_id = $1  returning *", [req.params.id]);
        res.json(editTodo.rows);
    });

export default router;