const express = require("express");
const todoRouter = express.Router();
const {
  createTodo,
  getTodo,
  getTodos,
  updateTodoTitle,
  deleteTodo,
} = require("../controller/todoController.js");

const {
  create_task,
  delete_task,
  update_task,
  getasks,
} = require("../controller/taskController.js");

// todo
todoRouter
  .route("/todo")
  .get(getTodo)
  .post(createTodo)
  .delete(deleteTodo)
  .put(updateTodoTitle);

// todos
todoRouter.get("/todos/userId/:userId", getTodos);

// Task
todoRouter
  .route("/task")
  .post(create_task)
  .patch(update_task)
  .delete(delete_task);

module.exports = todoRouter;
