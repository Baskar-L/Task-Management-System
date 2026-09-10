import React, { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import TaskForm from "../../components/tasks/TaskForm";
import { createTask } from "../../services/taskService";

const CreateTask = () => {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    taskData
  ) => {
    try {
      setLoading(true);
      setError("");

      await createTask(taskData);

      navigate("/dashboard", {
        replace: true,
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to create task."
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="text-sm font-medium text-[#254593] hover:underline"
          >
            ← Back to Tasks
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Create Task
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Add a new task to your task list.
          </p>
        </div>

        {/* Server error */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <TaskForm
            onSubmit={handleSubmit}
            loading={loading}
            submitText="Create Task"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTask;