const express = require("express");
const app = express();
const cors = require("cors");
const todoRouter = require("./router/todoRouter.js");
app.use(cors());
app.use(express.json());

// routes
app.use("/api", todoRouter);

module.exports = app;
