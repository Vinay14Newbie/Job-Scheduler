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
    const filters = {
      status: req.query.status || "",
      priority: req.query.priority || "",
    };

    // Remove empty values from filters
    Object.keys(filters).forEach(
      (key) => filters[key] === "" && delete filters[key],
    );

    const jobs = await jobService.getJobsService(filters);
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
    const jobId = Number(req.params.id);

    const result = await jobService.executeJobService(jobId);

    res.status(200).json(result);
  } catch (error) {
    if (error.message === "JOB_NOT_FOUND") {
      return res.status(404).json({ error: "Job not found" });
    }

    if (error.message === "JOB_ALREADY_COMPLETED") {
      return res.status(400).json({ error: "Job already completed" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

export const triggerWebhookController = async (req, res) => {
  try {
    const jobId = Number(req.params.id);
    if (isNaN(jobId)) return res.status(400).json({ error: "Invalid job id" });
    const { webhookUrl } = req.body;
    const job = await jobService.getJobByIdService(jobId);
    if (!job) return res.status(404).json({ error: "Job not found" });

    await jobService.triggerWebhookService({ webhookUrl, job });
    return res.json({ message: "Webhook triggered" });
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
