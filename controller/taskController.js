const todoModel = require("../model/todoModel.js");

//create single task / multiple task
const create_task = async (req, res) => {
  const { todoId, tasks } = req.body;
  if (!todoId || !tasks) {
    return res.status(400).json({
      success: false,
      message: "Invalid request todoId and tasks are required",
    });
  }

  try {
    const result = await todoModel.findByIdAndUpdate(
      todoId,
      { $push: { tasks: { $each: tasks } } },
      { new: true, runValidators: true }
    );
    if (result) {
      // status code for creating the resource
      res.status(200).json({
        success: true,
        data: result.tasks[result.tasks.length - 1],
      });
    } else {
      // 404 for not found
      res.status(404).json({ success: false, message: "Not found" });
    }
  } catch (error) {
    // dublicate key error
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "Title Shoule Be Unique" });
    }
    /// show error if _id is invalid
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: `Resource not found , Invalid ${error.path}`,
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// delete task
const delete_task = async (req, res) => {
  const { todoId, taskId } = req.body;
  if (!todoId || !taskId) {
    return res
      .status(400)
      .json({ success: false, message: "todoId and taskId both are required" });
  }
  try {
    const result = await todoModel.findOneAndUpdate(
      { id: todoId, "tasks._id": taskId },
      { $pull: { tasks: { _id: taskId } } }
    );
    if (result) {
      res
        .status(201) // 202 is from accepeted
        .json({ success: true, message: "successfully removed the task" });
    } else {
      // 404 for not found
      res.status(404).json({ success: false, message: "Resource Not found" });
    }
  } catch (error) {
    /// show error if _id is invalid
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: `Resource not found , Invalid ${error.path}`,
      });
    }
    res.statsu(500).json({ success: false, message: error.message });
  }
};

// update task
const update_task = async (req, res) => {
  const { todoId, taskId, task, checked } = req.body;
  if (!todoId || !taskId) {
    return res.status(400).json({
      success: false,
      message: "Invalid request  todoId, taskId are required",
    });
  }

  try {
    const result = await todoModel.findOneAndUpdate(
      { _id: todoId, "tasks._id": taskId },
      { $set: { "tasks.$.task": task, "tasks.$.checked": checked } },
      { runValidators: true }
    );
    if (result) {
      return res
        .status(201)
        .json({ success: true, message: "successfully Updated task" });
    } else {
      // 404 for not found
      return res.status(404).json({ success: true, message: "Not found" });
    }
  } catch (error) {
    /// show error if _id is invalid
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: `Resource not found , Invalid ${error.path}`,
      });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  create_task,
  delete_task,
  update_task,
};
