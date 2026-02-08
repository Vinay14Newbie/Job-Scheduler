import prisma from "../config/prismaConfig.js";

export const createJob = async (data) => {
  return prisma.job.create({ data });
};

export const getAllJobs = async (filters = {}) => {
  const where = {};

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.priority) {
    where.priority = filters.priority;
  }

  return prisma.job.findMany({ where });
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

export const deleteJobById = async (id) => {
  const job = await prisma.job.findUnique({
    where: { id },
  });

  if (!job) {
    throw new Error("JOB_NOT_FOUND");
  }

  await prisma.job.delete({
    where: { id },
  });

  return true;
};
