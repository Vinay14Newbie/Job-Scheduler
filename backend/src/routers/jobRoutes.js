import { Router } from "express";
import {
  createJob,
  getJobs,
  getJobById,
  executeJob,
  triggerWebhook,
} from "../controllers/jobController.js";

const router = Router();

router.post("/", createJob);
router.get("/", getJobs);
router.get("/jobs/:id", getJobById);
router.post("/:id/execute", executeJob);
router.post("/:id/webhook", triggerWebhook);

export default router;
