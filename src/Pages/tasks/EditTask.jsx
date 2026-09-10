import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import TaskForm from "../../components/tasks/TaskForm";

import {
  getTaskById,
  updateTask,
} from "../../services/taskService";

const EditTask = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [task, setTask] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getTaskById(id);

        console.log(
          "EDIT TASK RESPONSE:",
          response
        );

        // getTaskById() already returns response.data
        // Actual task is inside response.data
        setTask(response.data);
      } catch (err) {
        console.error(
          "LOAD EDIT TASK ERROR:",
          err
        );

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Unable to load task."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (
    taskData
  ) => {
    try {
      setSaving(true);
      setError("");

      console.log(
        "UPDATE TASK DATA:",
        taskData
      );

      const response =
        await updateTask(
          id,
          taskData
        );

      console.log(
        "UPDATE TASK RESPONSE:",
        response
      );

      navigate(`/tasks/${id}`, {
        replace: true,
      });
    } catch (err) {
      console.error(
        "UPDATE TASK ERROR:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to update task."
      );

      throw err;
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-3xl animate-pulse rounded-xl bg-gray-200 p-10">
          <div className="h-8 w-48 rounded bg-gray-300" />

          <div className="mt-6 h-12 rounded bg-gray-300" />

          <div className="mt-4 h-32 rounded bg-gray-300" />
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Task not found
          </h1>

          <p className="mt-2 text-gray-500">
            {error ||
              "The requested task does not exist."}
          </p>

          <Link
            to="/dashboard"
            className="mt-5 inline-block rounded-lg bg-[#254593] px-5 py-3 font-medium text-white"
          >
            Back to Tasks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">

        {/* Header */}
        <div className="mb-6">
          <Link
            to={`/tasks/${id}`}
            className="text-sm font-medium text-[#254593] hover:underline"
          >
            ← Back to Task
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Edit Task
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Update your task details.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <TaskForm
            initialData={task}
            onSubmit={handleSubmit}
            loading={saving}
            submitText="Update Task"
          />
        </div>
      </div>
    </div>
  );
};

export default EditTask;