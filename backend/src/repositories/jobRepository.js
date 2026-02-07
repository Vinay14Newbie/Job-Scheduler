import prisma from "../config/prismaConfig.js";

export const createJob = async (data) => {
  return prisma.job.create({ data });
};

export const getAllJobs = async () => {
  return prisma.job.findMany();
};
