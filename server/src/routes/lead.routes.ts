import express from "express";
import { 
  createLead, 
  getLeads, 
  getLeadById, 
  updateLead, 
  deleteLead 
} from "../controllers/lead.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", verifyToken, createLead);
router.get("/", verifyToken, getLeads);
router.get("/:leadId", verifyToken, getLeadById);
router.put("/:leadId", verifyToken, updateLead);
router.delete("/:leadId", verifyToken, deleteLead);

export default router;