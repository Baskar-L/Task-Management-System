import express from "express";
import { body } from "express-validator";

import protect from "../middleware/authMiddleware.js";
import validate from "../middleware/validateMiddleware.js";

import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/taskController.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| All task routes are protected
|--------------------------------------------------------------------------
| User must send:
|
| Authorization: Bearer <JWT_TOKEN>
|
*/
router.use(protect);


/*
|--------------------------------------------------------------------------
| GET /api/tasks
|--------------------------------------------------------------------------
| Get user's tasks
|
| Supports:
| - Pagination
| - Search
| - Status filter
| - Priority filter
| - Sorting
|
| Example:
| /api/tasks?page=1&limit=10
| /api/tasks?status=pending
| /api/tasks?priority=high
| /api/tasks?search=react
| /api/tasks?sortBy=dueDate&sortOrder=asc
|--------------------------------------------------------------------------
*/
router.get(
  "/",
  getTasks
);


/*
|--------------------------------------------------------------------------
| GET /api/tasks/:id
|--------------------------------------------------------------------------
| Get single task
|--------------------------------------------------------------------------
*/
router.get(
  "/:id",
  getTaskById
);


/*
|--------------------------------------------------------------------------
| POST /api/tasks
|--------------------------------------------------------------------------
| Create task
|--------------------------------------------------------------------------
*/
router.post(
  "/",

  // Validation
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 200 })
    .withMessage(
      "Title cannot exceed 200 characters"
    ),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage(
      "Description cannot exceed 2000 characters"
    ),

  body("status")
    .optional()
    .isIn([
      "pending",
      "in_progress",
      "completed"
    ])
    .withMessage("Invalid status"),

  body("priority")
    .optional()
    .isIn([
      "low",
      "medium",
      "high"
    ])
    .withMessage("Invalid priority"),

  body("dueDate")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("Invalid due date"),

  // Validation middleware
  validate,

  // Controller
  createTask
);


/*
|--------------------------------------------------------------------------
| PUT /api/tasks/:id
|--------------------------------------------------------------------------
| Update task
|--------------------------------------------------------------------------
*/
router.put(
  "/:id",

  // Validation
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ max: 200 })
    .withMessage(
      "Title cannot exceed 200 characters"
    ),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage(
      "Description cannot exceed 2000 characters"
    ),

  body("status")
    .optional()
    .isIn([
      "pending",
      "in_progress",
      "completed"
    ])
    .withMessage("Invalid status"),

  body("priority")
    .optional()
    .isIn([
      "low",
      "medium",
      "high"
    ])
    .withMessage("Invalid priority"),

  body("dueDate")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("Invalid due date"),

  // Validation middleware
  validate,

  // Controller
  updateTask
);


/*
|--------------------------------------------------------------------------
| DELETE /api/tasks/:id
|--------------------------------------------------------------------------
| Delete task
|--------------------------------------------------------------------------
*/
router.delete(
  "/:id",
  deleteTask
);

export default router;