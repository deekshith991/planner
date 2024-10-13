
const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  Author: {
    type: String,
    require: true,
  },
  Uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  UserId: {
    type: String,
    require: true
  },
  Task: {
    type: String,
    require: true
  },

});

module.exports = mongoose.model("tasks", TaskSchema);
