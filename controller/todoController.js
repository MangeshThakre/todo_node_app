const { findOneAndUpdate } = require("../model/todoModel.js");
const todoModel = require("../model/todoModel.js");

//  add new todo
const create_todo = async (req, res) => {
  const title = req.body.title;
  const tasks = req.body.tasks;
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
  const todo_id = req.query.todo_id;
  try {
    const result = await todoModel.findById(todo_id);
    if (result) {
      return res.status(200).json({ success: true, data: result });
    } else {
      return res.status(500).json({
        successs: false,
        message: "The todo you are searching for is not available",
      });
    }
  } catch (error) {
    res.status(500).json({ successs: false, message: error.message });
  }
};

// delete todo
const delete_todo = async (req, res) => {
  const toto_id = req.query.todo_id;
  try {
    const result = await todoModel.findByIdAndDelete(toto_id);
    if (result) {
      res.status(200).json({
        success: false,
        message: "Successfly deleted the todo",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "The todo you are trying to delete is not available",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//create task
const create_task = async (req, res) => {
  const todo_id = req.body.todo_id;
  const tasks = req.body.tasks;
  try {
    const result = findByIdAndUpdate(todo_id, {});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// delete task
const delete_task = async (req, res) => {};
// update task
const update_task = async (req, res) => {};

module.exports = {
  create_todo,
  get_todo,
  get_todos,
  delete_todo,
  create_task,
  delete_task,
  update_task,
};
