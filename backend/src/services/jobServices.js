import * as jobRepository from "../repositories/jobRepository.js";

export const createJobService = async (jobData) => {
  try {
    return jobRepository.createJob(jobData);
  } catch (error) {
    console.log("createJob controller error: ", error);
  }
};

export const getJobsService = async () => {
  try {
    return jobRepository.getAllJobs();
  } catch (error) {
    console.log("getJob controller error: ", error);
  }
};
