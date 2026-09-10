import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";

import {
  getTasks,
  deleteTask,
} from "../../services/taskService";

import TaskFilters from "../../components/tasks/TaskFilters";
import TaskList from "../../components/tasks/TaskList";
import Pagination from "../../components/tasks/Pagination";

const defaultFilters = {
  search: "",
  status: "",
  priority: "",
  sortBy: "createdAt",
  sortOrder: "desc",
};

const Dashboard = () => {
  const [tasks, setTasks] =
    useState([]);

  const [pagination, setPagination] =
    useState({
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    });

  const [filters, setFilters] =
    useState(defaultFilters);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [deletingId, setDeletingId] =
    useState(null);

const fetchTasks = useCallback(
  async (page = 1) => {
    try {
      setLoading(true);
      setError("");

      const params = {
        page,
        limit: 10,
        ...filters,
      };

      const response =
        await getTasks(params);

      console.log(
        "TASK API RESPONSE:",
        response
      );

      const data =
        response.data;

      setTasks(data.tasks || []);

      setPagination(
        data.pagination || {
          page,
          limit: 10,
          total: 0,
          totalPages: 0,
        }
      );
    } catch (err) {
      console.error(
        "GET TASKS ERROR:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load tasks."
      );
    } finally {
      setLoading(false);
    }
  },
  [filters]
);

  useEffect(() => {
    fetchTasks(1);
  }, [fetchTasks]);

  const handleFilterChange = (
    changedFilter
  ) => {
    setFilters((previous) => ({
      ...previous,
      ...changedFilter,
    }));
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
  };

  const handlePageChange = (page) => {
    fetchTasks(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (task) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${task.title}"?`
      );

    if (!confirmed) return;

    try {
      setDeletingId(task._id);

      await deleteTask(task._id);

      const currentPage =
        pagination.page;

      const shouldGoPreviousPage =
        tasks.length === 1 &&
        currentPage > 1;

      await fetchTasks(
        shouldGoPreviousPage
          ? currentPage - 1
          : currentPage
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to delete task."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              My Tasks
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage and track all your tasks.
            </p>
          </div>

          <Link
            to="/tasks/create"
            className="inline-flex items-center justify-center rounded-lg bg-[#254593] px-5 py-3 font-semibold text-white transition hover:bg-[#1d397c]"
          >
            + Create Task
          </Link>
        </div>

        {/* Filters */}
        <TaskFilters
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {/* Error */}
        {error && (
          <div className="mt-5 flex items-center justify-between gap-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            <span>{error}</span>

            <button
              type="button"
              onClick={() =>
                fetchTasks(pagination.page)
              }
              className="font-semibold underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Result count */}
        {!loading && (
          <div className="my-5 text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {tasks.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-700">
              {pagination.total}
            </span>{" "}
            tasks
          </div>
        )}

        {/* Tasks */}
        <TaskList
          tasks={tasks}
          loading={loading}
          onDelete={handleDelete}
        />

        {/* Pagination */}
        {!loading && (
          <Pagination
            page={pagination.page}
            totalPages={
              pagination.totalPages
            }
            onPageChange={
              handlePageChange
            }
          />
        )}

        {/* Delete loading indicator */}
        {deletingId && (
          <div className="fixed bottom-5 right-5 rounded-lg bg-gray-900 px-4 py-3 text-sm text-white shadow-lg">
            Deleting task...
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;