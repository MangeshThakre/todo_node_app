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
  const todoId = req.body.todoId;
  const task = req.body.task;

  try {
    const result = await todoModel.findByIdAndUpdate(todoId, {
      $push: { tasks: { task } },
    });
    if (result) {
      res
        .status(201)
        .json({ success: false, message: "successfult added new task" });
      // status code for creating the resource
    } else {
      // 404 for not found
      res.status(404).json({ success: true, message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// delete task
const delete_task = async (req, res) => {
  const todoId = req.query.todoId;
  const taskId = req.query.taskId;

  if (!todoId || !taskId) {
    return res.status(404).json({ success: true, message: "Invalid request" });
  }

  try {
    const result = await todoModel.findOneAndUpdate(
      { id: todoId },
      { $pull: { tasks: { _id: taskId } } }
    );
    if (result) {
      res
        .status(202) // 202 is from accepeted
        .json({ success: true, message: "successfuly removed the task" });
    } else {
      // 404 for not found
      res.status(404).json({ success: true, message: "Not found" });
    }
  } catch (error) {
    res.statsu(500).json({ success: false, message: error.message });
  }
};

// update task
const update_task = async (req, res) => {
  const todoId = req.body.todoId;
  const taskId = req.body.taskId;
  const task = req.body.task;

  if (!todoId || !taskId || !task) {
    return res.status(400).json({ success: false, message: "Invalid request" });
  }
  try {
    const result = await todoModel.findOneAndUpdate(
      { _id: todoId, "tasks._id": taskId },
      { $set: { "tasks.$.task": task } }
    );
    if (result) {
      return res
        .status(201)
        .json({ success: true, message: "Successfuly Updated" });
    } else {
      // 404 for not found
      return res.status(404).json({ success: true, message: "Not found" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  create_todo,
  get_todo,
  get_todos,
  delete_todo,
  create_task,
  delete_task,
  update_task,
};
