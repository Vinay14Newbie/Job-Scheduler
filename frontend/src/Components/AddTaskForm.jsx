import { useState } from "react";
import { createJob } from "../apis/jobApi";

const AddTaskForm = ({ onTaskAdded, onClose }) => {
  const [formData, setFormData] = useState({
    taskName: "",
    priority: "Medium",
    webhookUrl: "",
    payload: {
      description: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "description") {
      setFormData((prev) => ({
        ...prev,
        payload: {
          ...prev.payload,
          description: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!formData.taskName.trim()) {
        setError("Task name is required");
        setLoading(false);
        return;
      }

      await createJob(formData);
      setSuccess("Task created successfully!");
      setFormData({
        taskName: "",
        priority: "Medium",
        webhookUrl: "",
        payload: {
          description: "",
        },
      });

      // Call the callback to refresh jobs
      if (onTaskAdded) {
        onTaskAdded();
      }

      // Close modal after 1.5 seconds
      setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-start gap-3">
          <span className="text-lg mt-0.5">⚠️</span>
          <div>{error}</div>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm flex items-start gap-3">
          <span className="text-lg mt-0.5">✓</span>
          <div>{success}</div>
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Task Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="taskName"
          value={formData.taskName}
          onChange={handleChange}
          placeholder="Enter task name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white disabled:bg-gray-50 disabled:text-gray-500"
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.payload.description}
          onChange={handleChange}
          placeholder="Enter task description (optional)"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white resize-none disabled:bg-gray-50 disabled:text-gray-500"
          rows="3"
          disabled={loading}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Priority
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white disabled:bg-gray-50 disabled:text-gray-500"
            disabled={loading}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Webhook URL
          </label>
          <input
            type="url"
            name="webhookUrl"
            value={formData.webhookUrl}
            onChange={handleChange}
            placeholder="https://example.com (optional)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white disabled:bg-gray-50 disabled:text-gray-500"
            disabled={loading}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg text-white font-semibold transition duration-200 ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 active:scale-95"
        }`}
      >
        {loading ? "Creating..." : "✓ Add Task"}
      </button>
    </form>
  );
};

export default AddTaskForm;
