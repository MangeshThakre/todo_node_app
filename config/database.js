const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL;

const mongoDbconnection = () => {
  mongoose
    .connect(MONGODB_URL)
    .then((data) =>
      console.log(`successfuly connected to DB ${data.connection.host}`)
    )
    .catch((error) => console.log(error));
};

module.exports = mongoDbconnection;
