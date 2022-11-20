require("dotenv").config();
const app = require("./app.js");
const mongoDbconnection = require("./config/database.js");
const PORT = process.env.PORT || 8081;

// database connection
mongoDbconnection();

app.listen(PORT, () =>
  console.log(`server is listning at http://locaslhost${PORT}`)
);
