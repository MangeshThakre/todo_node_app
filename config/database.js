const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL;

const mongoDbconnection = () => {
  mongoose
    .connect(MONGODB_URL, {
      //must add in order to not get any error masseges:
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then((data) =>
      console.log(`successfuly connected to DB ${data.connection.host}`)
    )
    .catch((error) => console.log(error));
};

module.exports = mongoDbconnection;
