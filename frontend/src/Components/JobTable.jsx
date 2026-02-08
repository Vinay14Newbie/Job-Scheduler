import JobRow from "./JobRow";

const JobTable = ({ jobs, reloadJobs }) => {
  return (
    <table className="w-full border rounded">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2">ID</th>
          <th>Task</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Created</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <JobRow key={job.id} job={job} reloadJobs={reloadJobs} />
        ))}
      </tbody>
    </table>
  );
};

export default JobTable;
