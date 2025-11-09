import express, { Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import leadRoutes from "./routes/lead.routes";
import taskRoutes from './routes/task.routes';
import ticketRoutes from "./routes/ticket.routes";
import userRoutes from './routes/user.routes';

const app = express();
app.use(express.json())
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/tickets", ticketRoutes);
app.use('/api/users', userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("CRM Server is Working");
});

export default app;