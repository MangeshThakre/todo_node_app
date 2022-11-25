const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL;

const mongoDbconnection = () => {
  mongoose
    .connect(MONGODB_URL)
    .then((data) =>
      console.log(`successfuly connected to DB ${data.connection.host}`)
    );
};

module.exports = mongoDbconnection;
