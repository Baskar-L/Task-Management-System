import React from "react";
import { Link } from "react-router-dom";

const statusStyles = {
  pending:
    "bg-yellow-100 text-yellow-700 border-yellow-200",
  in_progress:
    "bg-blue-100 text-blue-700 border-blue-200",
  completed:
    "bg-green-100 text-green-700 border-green-200",
};

const priorityStyles = {
  low:
    "bg-green-100 text-green-700 border-green-200",
  medium:
    "bg-yellow-100 text-yellow-700 border-yellow-200",
  high:
    "bg-red-100 text-red-700 border-red-200",
};

const formatStatus = (status) => {
  if (!status) return "Pending";

  return status
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
};

const formatDate = (date) => {
  if (!date) return "No due date";

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

const TaskCard = ({
  task,
  onDelete,
}) => {
  if (!task) return null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-gray-900">
            {task.title}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Created{" "}
            {formatDate(task.createdAt)}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${
            statusStyles[task.status] ||
            statusStyles.pending
          }`}
        >
          {formatStatus(task.status)}
        </span>
      </div>

      {/* Description */}
      <p className="mb-4 min-h-[48px] text-sm leading-6 text-gray-600">
        {task.description ||
          "No description provided."}
      </p>

      {/* Details */}
      <div className="mb-5 flex flex-wrap gap-2">
        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${
            priorityStyles[task.priority] ||
            priorityStyles.medium
          }`}
        >
          Priority:{" "}
          {formatStatus(task.priority)}
        </span>

        <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600">
          Due: {formatDate(task.dueDate)}
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 border-t border-gray-100 pt-4">
        <Link
          to={`/tasks/${task._id}`}
          className="rounded-lg bg-[#254593] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1d397c]"
        >
          View
        </Link>

        <Link
          to={`/tasks/${task._id}/edit`}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Edit
        </Link>

        <button
          type="button"
          onClick={() => onDelete?.(task)}
          className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;