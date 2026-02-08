import * as jobRepository from "../repositories/jobRepository.js";
import prisma from "../config/prismaConfig.js";
import axios from "axios";
import { WEBHOOK_URL } from "../config/serverConfig.js";

export const createJobService = async (jobData) => {
  try {
    return jobRepository.createJob(jobData);
  } catch (error) {
    console.log("createJob services error: ", error);
  }
};

export const getJobsService = async (filters = {}) => {
  try {
    return jobRepository.getAllJobs(filters);
  } catch (error) {
    console.log("getJob services error: ", error);
  }
};

export const getJobByIdService = async (id) => {
  try {
    const job = await jobRepository.getJobById(id);
    if (!job) {
      throw new Error("Job not found");
    }
    return job;
  } catch (error) {
    console.log("getJobId services error: ", error);
    throw error;
  }
};

export const executeJobService = async (jobId) => {
  const job = await getJobByIdService(jobId);

  if (!job) {
    throw new Error("JOB_NOT_FOUND");
  }

  if (job.status === "completed") {
    throw new Error("JOB_ALREADY_COMPLETED");
  }

  // Mark as running immediately
  await prisma.job.update({
    where: { id: jobId },
    data: { status: "running" },
  });

  // Schedule completion in background (don't wait for this)
  scheduleJobCompletion(jobId);

  return { message: "Job execution started" };
};

// Helper function to complete job after 3 seconds
const scheduleJobCompletion = (jobId) => {
  console.log("Scheduling job completion for:", jobId);

  setTimeout(async () => {
    try {
      const completedJob = await prisma.job.update({
        where: { id: jobId },
        data: {
          status: "completed",
          completedAt: new Date(),
        },
      });

      // Trigger webhook
      await triggerWebhookService({
        webhookUrl: WEBHOOK_URL,
        job: completedJob,
      });
    } catch (error) {
      console.error(`Error completing job ${jobId}:`, error.message);
    }
  }, 3000);
};

export const triggerWebhookService = async ({ webhookUrl, job }) => {
  if (!webhookUrl) return;

  try {
    const data = await axios.post(webhookUrl, {
      event: "JOB_COMPLETED",
      data: {
        id: job.id,
        taskName: job.taskName,
        status: job.status,
        priority: job.priority,
        payload: job.payload,
        completedAt: job.completedAt,
      },
    });

    console.log(`Webhook triggered for job ${job.id}`);
    console.log(`Webhook response:`, data.data);
  } catch (error) {
    console.error("Webhook failed:", error.message);
  }
};
