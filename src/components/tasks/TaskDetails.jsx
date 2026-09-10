import React from "react";
import { Link } from "react-router-dom";

const formatStatus = (value) => {
  if (!value) return "-";

  return value
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
};

const formatDate = (value) => {
  if (!value) return "Not set";

  return new Date(value).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );
};

const TaskDetails = ({
  task,
  onDelete,
}) => {
  if (!task) return null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Title */}
      <div className="border-b border-gray-100 pb-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-[#254593]">
              Task Details
            </p>

            <h1 className="text-2xl font-bold text-gray-900">
              {task.title}
            </h1>
          </div>

          <span className="w-fit rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
            {formatStatus(task.status)}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="py-6">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Description
        </h2>

        <p className="whitespace-pre-wrap leading-7 text-gray-700">
          {task.description ||
            "No description provided."}
        </p>
      </div>

      {/* Information */}
      <div className="grid grid-cols-1 gap-4 border-t border-gray-100 pt-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-xs font-medium text-gray-500">
            Priority
          </p>

          <p className="mt-1 font-semibold capitalize text-gray-900">
            {task.priority || "-"}
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-xs font-medium text-gray-500">
            Due Date
          </p>

          <p className="mt-1 font-semibold text-gray-900">
            {formatDate(task.dueDate)}
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-xs font-medium text-gray-500">
            Created
          </p>

          <p className="mt-1 font-semibold text-gray-900">
            {formatDate(task.createdAt)}
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-xs font-medium text-gray-500">
            Updated
          </p>

          <p className="mt-1 font-semibold text-gray-900">
            {formatDate(task.updatedAt)}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap gap-3 border-t border-gray-100 pt-6">
        <Link
          to={`/tasks/${task._id}/edit`}
          className="rounded-lg bg-[#254593] px-5 py-2.5 font-medium text-white transition hover:bg-[#1d397c]"
        >
          Edit Task
        </Link>

        <button
          type="button"
          onClick={() => onDelete?.(task)}
          className="rounded-lg border border-red-200 px-5 py-2.5 font-medium text-red-600 transition hover:bg-red-50"
        >
          Delete Task
        </button>

        <Link
          to="/dashboard"
          className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Back to Tasks
        </Link>
      </div>
    </div>
  );
};

export default TaskDetails;