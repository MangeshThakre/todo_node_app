const { response } = require("express");
const todoModel = require("../model/todoModel.js");

//  add new todo
const createTodo = async (req, res) => {
  const { userId } = req.params;
  const { title, tasks } = req.body;
  const todoInfo = new todoModel({
    userId,
    title,
    tasks,
  });

  try {
    const result = await todoInfo.save();
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    // dublicate key error
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "Title Shoule Be Unique" });
    }
    // internal server error
    res.status(500).json({ success: false, message: error.message });
  }
};

// get todo
const getTodo = async (req, res) => {
  const todoId = req.body.todoId;
  const queryArr = Object.keys(req.query);
  let withTasks = false;
  if (queryArr.includes("withTasks") && req.query.withTasks === "true") {
    withTasks = true;
  }

  if (!todoId) {
    return res
      .status(400)
      .json({ success: false, message: "todoId is required" });
  }

  try {
    const result = await todoModel
      .findById(todoId, { tasks: withTasks })
      .select({ _id: 1, title: 1, isImportant: 1 });

    if (result) {
      return res.status(200).json({ success: true, data: result });
    } else {
      return res.status(400).json({
        successs: false,
        message: "The todo you are searching for is not available",
      });
    }
  } catch (error) {
    /// show error if _id is invalid
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: `Resource not found , Invalid ${error.path}`,
      });
    }
    res.status(500).json({ successs: false, message: error.message });
  }
};

// update todo title
const updateTodoTitle = async (req, res) => {
  const { todoId, title } = req.body;
  try {
    const result = await todoModel.findByIdAndUpdate(
      todoId,
      { title },
      { runValidators: true }
    );
    if (result) {
      return res.status(201).json({
        success: true,
        message: "successfully updated the todo title",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "The todo in not avalilable",
      });
    }
  } catch (error) {
    console.log(error);
    // dublicate key error
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "Title Shoule Be Unique" });
    }
    /// validation error
    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, message: error.message });
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

// delete todo
const deleteTodo = async (req, res) => {
  const { todoId } = req.body;
  if (!todoId) {
    return res
      .status(400)
      .json({ success: false, message: "todoId is required" });
  }

  try {
    const result = await todoModel.findByIdAndDelete({ todoId });
    if (result) {
      res.status(200).json({
        success: false,
        message: "successfully deleted the todo",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "The todo you are trying to delete is not available",
      });
    }
  } catch (error) {
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

// get  todos
const getTodos = async (req, res) => {
  const { userId } = req.params;
  const search = req.query.search ? req.query.search : "";
  const queryArr = Object.keys(req.query);

  //  check if with task is present in query and check the value value if true else withTasks = false
  let withTasks = false;
  if (queryArr.includes("withTasks") && req.query.withTasks === "true") {
    withTasks = true;
  }

  // checke if isImportant is present in query consider only true and false value else isImportant = null
  let isImportant = null;
  if (queryArr.includes("isImportant")) {
    if (req.query.isImportant === "true") isImportant = true;
    else if (req.query.isImportant === "false") isImportant = false;
  }

  const modelQuery = { userId };
  if (search) modelQuery["$text"] = { $search: search, $caseSensitive: false };
  if (isImportant) modelQuery["isImportant"] = isImportant;

  try {
    const result = await todoModel
      .find(modelQuery, { tasks: withTasks })
      .select({ _id: 1, title: 1, isImportant: 1 });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTodo,
  getTodo,
  getTodos,
  updateTodoTitle,
  deleteTodo,
};
