import express from "express";
import { body } from "express-validator";

import {
  register,
  login,
  getMe
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";
import validate from "../middleware/validateMiddleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| POST /api/auth/register
|--------------------------------------------------------------------------
| Register a new user
*/
router.post(
  "/register",

  // Validation
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "Name must be between 2 and 50 characters"
    ),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage(
      "Password must be at least 6 characters"
    ),

  // Validation middleware
  validate,

  // Controller
  register
);


/*
|--------------------------------------------------------------------------
| POST /api/auth/login
|--------------------------------------------------------------------------
| Login existing user
*/
router.post(
  "/login",

  // Validation
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),

  // Validation middleware
  validate,

  // Controller
  login
);


/*
|--------------------------------------------------------------------------
| GET /api/auth/me
|--------------------------------------------------------------------------
| Get currently authenticated user
*/
router.get(
  "/me",
  protect,
  getMe
);

export default router;