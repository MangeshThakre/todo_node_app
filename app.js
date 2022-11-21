const express = require("express");
const app = express();
const cors = require("cors");
const YAML = require("yamljs");
const todoRouter = require("./router/todoRouter.js");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = YAML.load("./docs/swagger.yaml");

app.use(cors());
app.use(express.json());

// swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// routes
app.use("/api", todoRouter);
module.exports = app;
