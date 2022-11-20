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

// GET

todoRouter.get("/get_todo", get_todo);

todoRouter.get("/get_todos", get_todos);

// PUT

// DELETE
todoRouter.delete("/delete_todo", delete_todo);

module.exports = todoRouter;
