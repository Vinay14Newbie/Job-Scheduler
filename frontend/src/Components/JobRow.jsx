import { runJob } from "../apis/jobApi";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { useState } from "react";

const JobRow = ({ job, reloadJobs }) => {
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState("");

  const handleRun = async () => {
    setIsRunning(true);
    setError("");

    try {
      await runJob(job.id);
      // Reload jobs to reflect the updated status
      await reloadJobs();
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Failed to run job. Please try again.";
      setError(errorMessage);
      console.error("Error running job:", err);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <>
      <tr className="hover:bg-blue-50 transition">
        <td className="px-6 py-4 text-sm text-gray-700 font-medium">
          #{job.id}
        </td>

        <td
          className="px-6 py-4 text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer transition"
          onClick={() => navigate(`/jobs/${job.id}`)}
        >
          {job.taskName}
        </td>

        <td className="px-6 py-4">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              job.priority === "High"
                ? "bg-red-100 text-red-700"
                : job.priority === "Medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
            }`}
          >
            {job.priority}
          </span>
        </td>

        <td className="px-6 py-4">
          <StatusBadge status={job.status} />
        </td>

        <td className="px-6 py-4 text-sm text-gray-600">
          {new Date(job.createdAt).toLocaleString()}
        </td>

        <td className="px-6 py-4 text-center">
          {job.status === "pending" && (
            <button
              onClick={handleRun}
              disabled={isRunning}
              className={`px-4 py-2 rounded-lg text-white font-semibold transition duration-200 ${
                isRunning
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:scale-95"
              }`}
            >
              {isRunning ? "Running..." : "Run"}
            </button>
          )}

          {job.status === "running" && (
            <button
              disabled
              className="px-4 py-2 rounded-lg bg-yellow-500 text-white font-semibold cursor-not-allowed inline-flex items-center gap-2"
            >
              <span className="animate-spin">⟳</span> Running
            </button>
          )}

          {job.status === "completed" && (
            <button
              disabled
              className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold cursor-not-allowed"
            >
              Completed
            </button>
          )}

          {job.status === "failed" && (
            <button
              disabled
              className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold cursor-not-allowed"
            >
              Failed
            </button>
          )}
        </td>
      </tr>

      {error && (
        <tr className="bg-red-50 border-t border-red-200">
          <td
            colSpan="6"
            className="px-6 py-3 text-red-700 text-sm flex items-center gap-2"
          >
            <span>⚠️</span> {error}
          </td>
        </tr>
      )}
    </>
  );
};

export default JobRow;
