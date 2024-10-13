

const express = require("express");
const router = express.Router();

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
    Task: task
  });

  try {
    await taskdoc.save();
    res.json(taskdoc).status(200);

  } catch {
    console.log(Error);
  }

});

module.exports = router;
