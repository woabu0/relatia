import express from "express";
import { 
  createTicket, 
  getTickets, 
  getTicketById, 
  updateTicket,
  getTicketStats,
  deleteTicket
} from "../controllers/ticket.controller";
import { verifyToken, authorizeRoles } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", verifyToken, createTicket);
router.get("/", verifyToken, getTickets);
router.get("/stats", verifyToken, authorizeRoles("admin"), getTicketStats);
router.get("/:ticketId", verifyToken, getTicketById);
router.put("/:ticketId", verifyToken, updateTicket);
router.delete("/:ticketId", verifyToken, authorizeRoles("admin"), deleteTicket);

export default router;