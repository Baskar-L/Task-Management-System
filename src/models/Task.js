import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },

    description: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: ""
    },

    status: {
      type: String,
      enum: [
        "pending",
        "in_progress",
        "completed"
      ],
      default: "pending",
      index: true
    },

    priority: {
      type: String,
      enum: [
        "low",
        "medium",
        "high"
      ],
      default: "medium",
      index: true
    },

    dueDate: {
      type: Date,
      default: null,
      index: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

// Useful indexes for user's task queries
taskSchema.index({
  userId: 1,
  createdAt: -1
});

taskSchema.index({
  userId: 1,
  status: 1
});

taskSchema.index({
  userId: 1,
  priority: 1
});

export default mongoose.model(
  "Task",
  taskSchema
);