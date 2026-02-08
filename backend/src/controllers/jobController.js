import * as jobService from "../services/jobServices.js";
import { deleteJobById } from "../repositories/jobRepository.js";

export const createJobController = async (req, res) => {
  try {
    const job = await jobService.createJobService(req.body);
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getJobsController = async (req, res) => {
  try {
    const jobs = await jobService.getJobsService();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getJobByIdController = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid job ID" });
    }

    const job = await jobService.getJobByIdService(id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    res.statu(500).json({ error: err.message });
  }
};

export const executeJobController = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid job ID" });
    }
    const result = await jobService.executeJobService(id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const triggerWebhookController = async (req, res) => {
  try {
    const { webhookUrl } = req.body;
    const result = await jobService.triggerWebhookService(
      req.params.id,
      webhookUrl,
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteJobByIdController = async (req, res) => {
  try {
    const jobId = Number(req.params.id);

    if (isNaN(jobId)) {
      return res.status(400).json({ error: "Invalid job id" });
    }

    await deleteJobById(jobId);

    return res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    if (error.message === "JOB_NOT_FOUND") {
      return res.status(404).json({ error: "Job not found" });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};
