const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please Enter Todo Title"],
    maxlength: [25, "Title should be less then or equal to 25 characters "],
    minLength: [3, "Title should be more then or equal to 3 characters "],
    trim: true,
    unique: true,
  },
  tasks: [
    new Schema({
      task: {
        type: String,
        required: [true, "Please Enter Task"],
        minLength: [
          3,
          "task Field requires more then or equal to 3 characters ",
        ],
      },
      checked: { type: Boolean, default: false },
    }),
  ],
});

const todoModel = mongoose.model("todo", todoSchema);
module.exports = todoModel;
