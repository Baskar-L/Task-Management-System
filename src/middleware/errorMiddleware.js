export const notFound = (
  req,
  res
) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
};

export const errorHandler = (
  error,
  req,
  res,
  next
) => {
  console.error(error);

  // Invalid MongoDB ObjectId
  if (error.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid resource ID"
    });
  }

  // Duplicate MongoDB value
  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Duplicate value"
    });
  }

  // Mongoose validation error
  if (
    error.name ===
    "ValidationError"
  ) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: Object.values(
        error.errors
      ).map((err) => err.message)
    });
  }

  res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : error.message
  });
};