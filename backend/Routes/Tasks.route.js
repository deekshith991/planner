

const express = require("express");
const router = express.Router();

const { LOG, Err_log } = require("../Utils/Logger.js");

const auth = require("../Middleware/TokenCheck");
const Tasks = require("../Models/Tasks.model.js");

router.get("/alltasks", auth, (req, res) => {
  res.send(req.user.UserId).status(200);
});

router.post("/newtask", auth, async (req, res) => {

  const { task } = req.body;
  const { UserId } = req.user;

  const taskdoc = new Tasks({
    UserId: UserId,
    Task: task,
    // Uid: "yfjyhfj"
  });

  try {
    await taskdoc.save();
    LOG(UserId, "Task", "Success");
    res.json(taskdoc).status(200);

  } catch (Error) {
    Err_log(Error, "new task req");
    res.json({ msg: "Error saving task" }).status(500);
  }

});

module.exports = router;
