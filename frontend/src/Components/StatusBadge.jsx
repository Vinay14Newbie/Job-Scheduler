const colors = {
  pending: "bg-yellow-100 text-yellow-800 border border-yellow-300",
  running: "bg-blue-100 text-blue-800 border border-blue-300",
  completed: "bg-green-100 text-green-800 border border-green-300",
  failed: "bg-red-100 text-red-800 border border-red-300",
};

const icons = {
  pending: "⏱️",
  running: "⏳",
  completed: "✓",
  failed: "✕",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`px-4 py-2 rounded-full font-semibold text-sm inline-flex items-center gap-2 ${colors[status] || "bg-gray-100 text-gray-800 border border-gray-300"}`}
    >
      <span>{icons[status]}</span>
      <span className="capitalize">{status}</span>
    </span>
  );
};

export default StatusBadge;
