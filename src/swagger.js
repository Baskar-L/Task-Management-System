import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Task Management API",
      version: "1.0.0",
      description:
        "REST API for a MERN Stack Task Management System"
    },

    servers: [
      {
           url: process.env.API_BASE_URL || "http://localhost:5000",
          description: "API server"
      }
    ],

    tags: [
      {
        name: "Authentication",
        description:
          "User registration and authentication"
      },
      {
        name: "Tasks",
        description:
          "Task management APIs"
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },

      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "68c123456789abcdef123456"
            },
            name: {
              type: "string",
              example: "Baskar"
            },
            email: {
              type: "string",
              example: "baskar@example.com"
            }
          }
        },

        Task: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "68c123456789abcdef123456"
            },
            title: {
              type: "string",
              example: "Build React Dashboard"
            },
            description: {
              type: "string",
              example:
                "Create task management dashboard"
            },
            status: {
              type: "string",
              enum: [
                "pending",
                "in_progress",
                "completed"
              ],
              example: "pending"
            },
            priority: {
              type: "string",
              enum: [
                "low",
                "medium",
                "high"
              ],
              example: "high"
            },
            dueDate: {
              type: "string",
              format: "date-time",
              nullable: true,
              example:
                "2026-09-15T00:00:00.000Z"
            },
            userId: {
              type: "string",
              example: "68c123456789abcdef123456"
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            }
          }
        }
      }
    }
  },

  apis: [
    "./src/swagger.js"
  ]
};

const swaggerSpec =
  swaggerJsdoc(options);

/*
|--------------------------------------------------------------------------
| Authentication APIs
|--------------------------------------------------------------------------
*/

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Baskar
 *               email:
 *                 type: string
 *                 example: baskar@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: Validation failed
 *       409:
 *         description: Email already registered
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: baskar@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Invalid email or password
 */

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get logged-in user
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user information
 *       401:
 *         description: Authentication required
 */


/*
|--------------------------------------------------------------------------
| Task APIs
|--------------------------------------------------------------------------
*/

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get user's tasks
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of tasks per page
 *
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - pending
 *             - in_progress
 *             - completed
 *
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum:
 *             - low
 *             - medium
 *             - high
 *
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search title or description
 *
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum:
 *             - createdAt
 *             - updatedAt
 *             - dueDate
 *             - priority
 *             - title
 *             - status
 *
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum:
 *             - asc
 *             - desc
 *
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *       401:
 *         description: Authentication required
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *       404:
 *         description: Task not found
 *       401:
 *         description: Authentication required
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Build React Dashboard
 *               description:
 *                 type: string
 *                 example: Create task management dashboard
 *               status:
 *                 type: string
 *                 enum:
 *                   - pending
 *                   - in_progress
 *                   - completed
 *                 example: pending
 *               priority:
 *                 type: string
 *                 enum:
 *                   - low
 *                   - medium
 *                   - high
 *                 example: high
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-09-15T00:00:00.000Z
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Authentication required
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum:
 *                   - pending
 *                   - in_progress
 *                   - completed
 *               priority:
 *                 type: string
 *                 enum:
 *                   - low
 *                   - medium
 *                   - high
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *       401:
 *         description: Authentication required
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       401:
 *         description: Authentication required
 */

export const setupSwagger = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true
    })
  );
};

export default swaggerSpec;