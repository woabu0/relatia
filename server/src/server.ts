import express, { Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes"

const app = express();
app.use(express.json())
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use("/api", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Working");
});

export default app;