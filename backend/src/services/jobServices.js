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
