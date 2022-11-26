import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors";
import todosRouter from "./routes/todoRoutes.js"
import db from "./config/db.js";

const app = express();
dotenv.config({ path: ".env" });
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.use("/", todosRouter);



app.listen(port, () => {
    console.log(`${colors.blue(`Server port :`)} ${colors.blue.underline(port)}`);
});