import * as jobService from "../services/jobServices.js";

export const createJob = async (req, res) => {
  try {
    const job = await jobService.createJobService(req.body);
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await jobService.getJobsService();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getJobById = async (req, res) => {
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

export const executeJob = async (req, res) => {
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

export const triggerWebhook = async (req, res) => {
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
