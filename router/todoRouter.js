const express = require("express");
const todoRouter = express.Router();
const {
  create_todo,
  get_todo,
  get_todos,
  delete_todo,
  create_task,
  delete_task,
  update_task,
} = require("../controller/todoController.js");

// POST

todoRouter.post("/create_todo", create_todo);
todoRouter.post("/create_task", create_task);

// GET

todoRouter.get("/get_todos", get_todos);
todoRouter.get("/get_todo/:todoId", get_todo);

// PUT

todoRouter.put("/update_task", update_task);

// DELETE

todoRouter.delete("/delete_todo/:totoId", delete_todo);
todoRouter.delete("/delete_task/:todoId/:taskId", delete_task);

module.exports = todoRouter;
