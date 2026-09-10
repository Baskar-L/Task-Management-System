import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

import {
  notFound,
  errorHandler
} from "./middleware/errorMiddleware.js";

import { setupSwagger } from "./swagger.js";

// Load environment variables
dotenv.config();

const app = express();


// Connect MongoDB
connectDB();


// Security middleware
app.use(helmet());


// CORS
app.use(
  cors({
    origin: "*"
  })
);


// Parse JSON requests
app.use(express.json());


// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,

  message: {
    success: false,
    message:
      "Too many requests. Please try again later."
  }
});

app.use("/api", limiter);


// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Task Management API is running"
  });
});


// Authentication routes
app.use(
  "/api/auth",
  authRoutes
);


// Task routes
app.use(
  "/api/tasks",
  taskRoutes
);


// Swagger documentation
setupSwagger(app);


// 404 handler
app.use(notFound);


// Centralized error handler
app.use(errorHandler);


const PORT =
  process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );

  console.log(
    `Swagger running on http://localhost:${PORT}/api-docs`
  );
});


export default app;