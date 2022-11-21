require("dotenv").config();
const app = require("./app.js");
const mongoDbconnection = require("./config/database.js");
const PORT = process.env.PORT || 8081;

// database connection
mongoDbconnection();

const server = app.listen(PORT, () =>
  console.log(`server is listning at http://locaslhost${PORT}`)
);

// unhandled promiss rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server due to unhandled promiss rejection`);
  server.close(() => {
    process.exit();
  });
});
