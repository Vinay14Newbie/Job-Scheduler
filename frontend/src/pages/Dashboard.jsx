import { useEffect, useState } from "react";
import { fetchJobs } from "../apis/jobApi";
import JobTable from "../components/JobTable";
import FilterBar from "../components/FilterBar";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
  });

  const loadJobs = async () => {
    const res = await fetchJobs(filters);
    setJobs(res?.data);
  };

  useEffect(() => {
    loadJobs();
  }, [filters]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Job Scheduler Dashboard</h1>

      <FilterBar filters={filters} setFilters={setFilters} />

      <JobTable jobs={jobs} reloadJobs={loadJobs} />
    </div>
  );
};

export default Dashboard;
