import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getTaskById,
  deleteTask,
} from "../../services/taskService";

import TaskDetailsComponent from "../../components/tasks/TaskDetails";

const TaskDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [task, setTask] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [deleting, setDeleting] =
    useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getTaskById(id);

        console.log(
          "TASK DETAILS RESPONSE:",
          response
        );

        /*
         * getTaskById() returns response.data
         *
         * Therefore response is:
         *
         * {
         *   success: true,
         *   data: {
         *     _id: "...",
         *     title: "...",
         *     ...
         *   }
         * }
         *
         * So the actual task is response.data
         */
        setTask(
          response.data
        );
      } catch (err) {
        console.error(
          "GET TASK DETAILS ERROR:",
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

  const handleDelete = async () => {
    if (!task) return;

    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${task.title}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await deleteTask(id);

      navigate("/dashboard", {
        replace: true,
      });
    } catch (err) {
      console.error(
        "DELETE TASK ERROR:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to delete task."
      );

      setDeleting(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-4xl animate-pulse rounded-xl bg-white p-8 shadow-sm">
          <div className="h-8 w-64 rounded bg-gray-200" />

          <div className="mt-8 h-24 rounded bg-gray-200" />

          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="h-20 rounded bg-gray-200" />

            <div className="h-20 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Task not found
  |--------------------------------------------------------------------------
  */
  if (!task) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Task not found
          </h1>

          <p className="mt-2 text-gray-500">
            {error ||
              "The requested task could not be found."}
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

  /*
  |--------------------------------------------------------------------------
  | Task Details
  |--------------------------------------------------------------------------
  */
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">

        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <TaskDetailsComponent
          task={task}
          onDelete={handleDelete}
        />

        {deleting && (
          <div className="fixed bottom-5 right-5 rounded-lg bg-gray-900 px-4 py-3 text-sm text-white shadow-lg">
            Deleting task...
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;