import React from "react";

const TaskFilters = ({
  filters,
  onChange,
  onReset,
}) => {
  const handleChange = (event) => {
    const { name, value } =
      event.target;

    onChange({
      [name]: value,
    });
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        {/* Search */}
        <div className="lg:col-span-2">
          <label
            htmlFor="search"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Search
          </label>

          <input
            id="search"
            name="search"
            type="text"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search title or description..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#254593] focus:ring-2 focus:ring-[#254593]/20"
          />
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="status-filter"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Status
          </label>

          <select
            id="status-filter"
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#254593]"
          >
            <option value="">
              All Status
            </option>

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

        {/* Priority */}
        <div>
          <label
            htmlFor="priority-filter"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Priority
          </label>

          <select
            id="priority-filter"
            name="priority"
            value={filters.priority}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-3 pr-8 text-sm outline-none focus:border-[#254593]"
          >
            <option value="">
              All Priority
            </option>

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

        {/* Sort */}
        <div>
          <label
            htmlFor="sortBy"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Sort By
          </label>

          <select
            id="sortBy"
            name="sortBy"
            value={filters.sortBy}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#254593]"
          >
            <option value="createdAt">
              Created Date
            </option>

            <option value="updatedAt">
              Updated Date
            </option>

            <option value="dueDate">
              Due Date
            </option>

            <option value="priority">
              Priority
            </option>

            <option value="title">
              Title
            </option>

            <option value="status">
              Status
            </option>
          </select>
        </div>
      </div>

      {/* Bottom row */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <label
            htmlFor="sortOrder"
            className="text-sm font-medium text-gray-700"
          >
            Order
          </label>

          <select
            id="sortOrder"
            name="sortOrder"
            value={filters.sortOrder}
            onChange={handleChange}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#254593]"
          >
            <option value="desc">
              Descending
            </option>

            <option value="asc">
              Ascending
            </option>
          </select>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default TaskFilters;