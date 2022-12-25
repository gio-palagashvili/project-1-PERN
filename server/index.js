import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";

const app = express();
dotenv.config({ path: ".env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use("/", userRoutes);
app.use("/", packageRoutes);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
    console.log(`${colors.italic(`App running on port`)} ${colors.italic.bold.underline(port)}`);
});