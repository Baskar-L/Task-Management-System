import Task from "../models/Task.js";

// Get all tasks
export const getTasks = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      priority,
      search,
      sortBy = "createdAt",
      sortOrder = "desc"
    } = req.query;

    // Pagination
    const currentPage = Math.max(
      parseInt(page, 10) || 1,
      1
    );

    const pageLimit = Math.min(
      Math.max(parseInt(limit, 10) || 10, 1),
      100
    );

    const skip =
      (currentPage - 1) * pageLimit;

    // IMPORTANT:
    // Only get tasks belonging to logged-in user
    const filter = {
      userId: req.user._id
    };

    // Filter by status
    if (status) {
      filter.status = status;
    }

    // Filter by priority
    if (priority) {
      filter.priority = priority;
    }

    // Search title and description
    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i"
          }
        },
        {
          description: {
            $regex: search,
            $options: "i"
          }
        }
      ];
    }

    // Allowed sorting fields
    const allowedSortFields = [
      "createdAt",
      "updatedAt",
      "dueDate",
      "priority",
      "title",
      "status"
    ];

    const safeSortBy =
      allowedSortFields.includes(sortBy)
        ? sortBy
        : "createdAt";

    const safeSortOrder =
      sortOrder === "asc" ? 1 : -1;

    // Get tasks and total count together
    const [tasks, total] = await Promise.all([
      Task.find(filter)
        .sort({
          [safeSortBy]: safeSortOrder
        })
        .skip(skip)
        .limit(pageLimit),

      Task.countDocuments(filter)
    ]);

    return res.status(200).json({
      success: true,
      data: {
        tasks,
        pagination: {
          page: currentPage,
          limit: pageLimit,
          total,
          totalPages: Math.ceil(
            total / pageLimit
          )
        }
      }
    });
  } catch (error) {
    next(error);
  }
};


// Get single task
export const getTaskById = async (
  req,
  res,
  next
) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,

      // Security:
      // User can only access their own task
      userId: req.user._id
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};


// Create task
export const createTask = async (
  req,
  res,
  next
) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      dueDate
    } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,

      // Automatically assign task
      // to logged-in user
      userId: req.user._id
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task
    });
  } catch (error) {
    next(error);
  }
};


// Update task
export const updateTask = async (
  req,
  res,
  next
) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,

      // Security:
      // Only update own task
      userId: req.user._id
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    const {
      title,
      description,
      status,
      priority,
      dueDate
    } = req.body;

    // Update only provided fields
    if (title !== undefined) {
      task.title = title;
    }

    if (description !== undefined) {
      task.description = description;
    }

    if (status !== undefined) {
      task.status = status;
    }

    if (priority !== undefined) {
      task.priority = priority;
    }

    if (dueDate !== undefined) {
      task.dueDate = dueDate;
    }

    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task
    });
  } catch (error) {
    next(error);
  }
};


// Delete task
export const deleteTask = async (
  req,
  res,
  next
) => {
  try {
    const task =
      await Task.findOneAndDelete({
        _id: req.params.id,

        // Security:
        // Only delete own task
        userId: req.user._id
      });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};