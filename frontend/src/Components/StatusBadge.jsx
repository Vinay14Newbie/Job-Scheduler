const colors = {
  pending: "bg-yellow-200",
  running: "bg-blue-200",
  completed: "bg-green-200",
};

const StatusBadge = ({ status }) => {
  return (
    <span className={`px-2 py-1 rounded ${colors[status]}`}>{status}</span>
  );
};

export default StatusBadge;
