import { Router } from "express";
import {
  createJob,
  getJobs,
  getJobById,
} from "../controllers/jobController.js";

const router = Router();

router.post("/", createJob);
router.get("/", getJobs);
router.get("/:id/jobs", getJobById);

export default router;
