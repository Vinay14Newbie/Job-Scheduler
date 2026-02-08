import { useEffect, useState } from "react";
import { fetchJobs } from "../apis/jobApi";
import JobTable from "../Components/JobTable";
import FilterBar from "../Components/FilterBar";
import AddTaskForm from "../Components/AddTaskForm";
import Modal from "../Components/Modal";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Job Scheduler
            </h1>
            <p className="text-gray-600">
              Manage and monitor your scheduled jobs
            </p>
          </div>
          <button
            onClick={() => setShowAddTaskModal(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition duration-200 active:scale-95 shadow-lg flex items-center gap-2"
          >
            <span>➕</span> Add Task
          </button>
        </div>

        <Modal
          isOpen={showAddTaskModal}
          onClose={() => setShowAddTaskModal(false)}
          title="➕ Add New Task"
        >
          <AddTaskForm
            onTaskAdded={loadJobs}
            onClose={() => setShowAddTaskModal(false)}
          />
        </Modal>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            Jobs List
          </h2>
          <FilterBar filters={filters} setFilters={setFilters} />
          <JobTable jobs={jobs} reloadJobs={loadJobs} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
