import * as jobRepository from "../repositories/jobRepository.js";

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

export const executeJobService = async (id) => {
  const job = await getJobByIdService(id);

  // simulate execution
  await jobRepository.updateJobStatus(id, "running");

  setTimeout(async () => {
    await jobRepository.updateJobStatus(id, "completed");
  }, 3000);

  return { message: "Job execution started" };
};

export const triggerWebhookService = async ({ webhookUrl, job }) => {
  if (!webhookUrl) return;

  try {
    await axios.post(webhookUrl, {
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
  } catch (error) {
    console.error("Webhook failed:", error.message);
  }
};
