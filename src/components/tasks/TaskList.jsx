import React from "react";
import TaskCard from "./TaskCard";

const TaskList = ({
  tasks = [],
  loading = false,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map(
          (_, index) => (
            <div
              key={index}
              className="h-64 animate-pulse rounded-xl bg-gray-200"
            />
          )
        )}
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl">
          ✓
        </div>

        <h3 className="text-lg font-semibold text-gray-800">
          No tasks found
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Create a new task or change your
          filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;