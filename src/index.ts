import express, { Application } from "express";
import cors from "cors";
import { userRouter } from "./routes/user.router";

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", userRouter);
app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(PORT, () => {
    try {
        console.log(`Server is running on PORT ${PORT}...`);
    } catch (error) {
        console.log(error);
    }
});
