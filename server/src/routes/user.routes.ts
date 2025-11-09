import express from "express";
import { getUserStats, getAllUsers } from "../controllers/user.controller";
import { verifyToken, authorizeRoles } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/stats", verifyToken, authorizeRoles("admin"), getUserStats);
router.get("/", verifyToken, authorizeRoles("admin"), getAllUsers);

export default router;