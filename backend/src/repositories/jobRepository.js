import prisma from "../config/prismaConfig.js";

export const createJob = async (data) => {
  return prisma.job.create({ data });
};

export const getAllJobs = async () => {
  return prisma.job.findMany();
};

export const getJobById = async (id) => {
  return prisma.job.findUnique({ where: { id } });
};

export const updateJobStatus = (id, status) => {
  return prisma.job.update({
    where: { id: Number(id) },
    data: { status, completedAt: status === "completed" ? new Date() : null },
  });
};
