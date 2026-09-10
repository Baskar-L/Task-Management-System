import React, { useEffect, useState } from "react";

const initialForm = {
  title: "",
  description: "",
  status: "pending",
  priority: "medium",
  dueDate: "",
};

const TaskForm = ({
  initialData = null,
  onSubmit,
  loading = false,
  submitText = "Create Task",
}) => {
  const [formData, setFormData] =
    useState(initialForm);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description:
          initialData.description || "",
        status:
          initialData.status || "pending",
        priority:
          initialData.priority || "medium",
        dueDate: initialData.dueDate
          ? new Date(initialData.dueDate)
              .toISOString()
              .split("T")[0]
          : "",
      });
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError("Title is required.");
      return;
    }

    try {
      setError("");

      const payload = {
        title: formData.title.trim(),
        description:
          formData.description.trim(),
        status: formData.status,
        priority: formData.priority,
        dueDate:
          formData.dueDate || null,
      };

      await onSubmit(payload);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Something went wrong."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Title
        </label>

        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          maxLength={200}
          placeholder="Enter task title"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#254593] focus:ring-2 focus:ring-[#254593]/20"
        />

        <p className="mt-1 text-xs text-gray-400">
          Maximum 200 characters
        </p>
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          maxLength={2000}
          rows={5}
          placeholder="Describe your task..."
          className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#254593] focus:ring-2 focus:ring-[#254593]/20"
        />

        <p className="mt-1 text-xs text-gray-400">
          Maximum 2000 characters
        </p>
      </div>

      {/* Status + Priority */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="status"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Status
          </label>

          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#254593] focus:ring-2 focus:ring-[#254593]/20"
          >
            <option value="pending">
              Pending
            </option>

            <option value="in_progress">
              In Progress
            </option>

            <option value="completed">
              Completed
            </option>
          </select>
        </div>

        <div>
          <label
            htmlFor="priority"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Priority
          </label>

          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#254593] focus:ring-2 focus:ring-[#254593]/20"
          >
            <option value="low">
              Low
            </option>

            <option value="medium">
              Medium
            </option>

            <option value="high">
              High
            </option>
          </select>
        </div>
      </div>

      {/* Due Date */}
      <div>
        <label
          htmlFor="dueDate"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Due Date
        </label>

        <input
          id="dueDate"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#254593] focus:ring-2 focus:ring-[#254593]/20"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-[#254593] px-5 py-3 font-semibold text-white transition hover:bg-[#1d397c] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? "Please wait..."
          : submitText}
      </button>
    </form>
  );
};

export default TaskForm;