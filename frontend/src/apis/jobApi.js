import axios from "axios";

const API = axios.create({
  baseURL: "https://job-scheduler-o36z.onrender.com/api",
});

export const fetchJobs = (filters = {}) =>
  API.get("/jobs", { params: filters });

export const fetchJobById = (id) => API.get(`/jobs/${id}`);

export const runJob = (id) => API.post(`/run-job/${id}`);

export const createJob = (data) => API.post("/jobs", data);

export const deleteJob = (id) => API.delete(`/jobs/${id}`);
