import express, { Request, Response } from "express";
import authRoutes from "./routes/auth.routes"

const app = express();

app.use("/api", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Working");
});

export default app;