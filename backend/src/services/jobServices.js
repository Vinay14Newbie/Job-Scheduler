import * as jobRepository from "../repositories/jobRepository.js";
import prisma from "../config/prismaConfig.js";
import axios from "axios";

export const createJobService = async (jobData) => {
  try {
    return jobRepository.createJob(jobData);
  } catch (error) {
    console.log("createJob services error: ", error);
  }
};

export const getJobsService = async () => {
  try {
    return jobRepository.getAllJobs();
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

  // Mark as running
  await prisma.job.update({
    where: { id: jobId },
    data: { status: "running" },
  });

  // Simulate execution
  setTimeout(async () => {
    const completedJob = await prisma.job.update({
      where: { id: jobId },
      data: {
        status: "completed",
        completedAt: new Date(),
      },
    });

    // Trigger webhook
    await triggerWebhookService({
      webhookUrl: completedJob.webhookUrl,
      job: completedJob,
    });
  }, 3000);

  return { message: "Job execution started" };
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
