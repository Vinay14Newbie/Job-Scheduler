import { Router } from "express";
import {
  createJobController,
  getJobsController,
  getJobByIdController,
  executeJobController,
  triggerWebhookController,
  deleteJobByIdController,
} from "../controllers/jobController.js";

const router = Router();

router.post("/", createJobController);
router.get("/", getJobsController);
router.get("/jobs/:id", getJobByIdController);
router.delete("/jobs/:id", deleteJobByIdController);
router.post("/:id/execute", executeJobController);
router.post("/:id/webhook", triggerWebhookController);

export default router;
