import { runJob } from "../apis/jobApi";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";

const JobRow = ({ job, reloadJobs }) => {
  const navigate = useNavigate();

  const handleRun = async () => {
    await runJob(job.id);
    reloadJobs();
  };

  return (
    <tr className="border-t text-center">
      <td>{job.id}</td>

      <td
        className="cursor-pointer text-blue-600"
        onClick={() => navigate(`/jobs/${job.id}`)}
      >
        {job.taskName}
      </td>

      <td>{job.priority}</td>

      <td>
        <StatusBadge status={job.status} />
      </td>

      <td>{new Date(job.createdAt).toLocaleString()}</td>

      <td>
        {job.status === "pending" && (
          <button
            onClick={handleRun}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Run
          </button>
        )}

        {job.status === "running" && (
          <button disabled className="bg-gray-400 px-3 py-1 rounded">
            Running
          </button>
        )}
      </td>
    </tr>
  );
};

export default JobRow;
