import JobRow from "./JobRow";

const JobTable = ({ jobs, reloadJobs }) => {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-gray-400 text-4xl mb-4">📋</div>
        <p className="text-gray-500 text-lg">
          No jobs found. Create one to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Task</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">
              Priority
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold">
              Status
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold">
              Created
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {jobs?.map?.((job) => (
            <JobRow key={job.id} job={job} reloadJobs={reloadJobs} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
