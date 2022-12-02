const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "userId is required"],
    },
    title: {
      type: String,
      required: [true, "Please Enter Todo Title"],
      maxlength: [25, "Title should be less then or equal to 25 characters "],
      trim: true,
      unique: true,
    },
    tasks: [
      new Schema({
        task: {
          type: String,
          required: [true, "Please Enter Task"],
        },
        checked: {
          type: Boolean,
          default: false,
        },
      }),
    ],
    isImportant: { type: Boolean, default: false },
  },
  { timestamps: true }
);

todoSchema.index({ "$**": "text" });
const todoModel = mongoose.model("todo", todoSchema);

module.exports = todoModel;
