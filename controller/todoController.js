const { findOneAndUpdate } = require("../model/todoModel.js");
const todoModel = require("../model/todoModel.js");

//  add new todo
const create_todo = async (req, res) => {
  const { title, tasks } = req.body;
  const todoInfo = new todoModel({
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
    /// validation error
    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, message: error.message });
    }
    // internal server error
    res.status(500).json({ success: false, message: error.message });
  }
};

// get  todos
const get_todos = async (req, res) => {
  try {
    const result = await todoModel.find();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.statsu(500).json({ success: false, message: error.message });
  }
};

// get todo
const get_todo = async (req, res) => {
  const { todoId } = req.params;
  try {
    const result = await todoModel.findById(todoId);
    if (result) {
      return res.status(200).json({ success: true, data: result });
    } else {
      return res.status(500).json({
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
const update_todo_title = async (req, res) => {
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
        message: "successfult updated the todo title",
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
const delete_todo = async (req, res) => {
  const { totoId } = req.params;
  try {
    const result = await todoModel.findByIdAndDelete(totoId);
    if (result) {
      res.status(200).json({
        success: false,
        message: "Successfly deleted the todo",
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

module.exports = {
  create_todo,
  get_todo,
  get_todos,
  update_todo_title,
  delete_todo,
};
