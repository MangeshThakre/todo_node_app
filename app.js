const express = require("express");
const app = express();
const cors = require("cors");
const YAML = require("yamljs");
const todoRouter = require("./router/todoRouter.js");
const path = require("path");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = YAML.load("./docs/swagger.yaml");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "./view")));

// routes
app.use("/api/v1", todoRouter);

// swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// view
app.get("/", (req, res) => {
  res.status(200).json({ success: true, data: "todo server 🤪" });
});

module.exports = app;
