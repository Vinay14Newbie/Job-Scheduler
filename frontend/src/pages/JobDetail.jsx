import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchJobById } from "../apis/jobApi";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJobById(id).then((res) => setJob(res.data));
  }, [id]);

  if (!job) return <p>Loading...</p>;

  const payload =
    typeof job.payload === "string" ? JSON.parse(job.payload) : job.payload;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Job Details</h2>

      <p>
        <b>Task:</b> {job.taskName}
      </p>
      <p>
        <b>Status:</b> {job.status}
      </p>
      <p>
        <b>Priority:</b> {job.priority}
      </p>

      <div className="mt-4">
        <h3 className="font-semibold">Payload</h3>
        <pre className="bg-gray-100 p-3 rounded">
          {JSON.stringify(payload, null, 2)}
        </pre>
      </div>

      <p className="mt-4 text-sm text-gray-600">
        Created: {new Date(job.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default JobDetail;
