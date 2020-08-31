const express = require("express");
const Task = require("../models/tasks");
const router = express.Router();
const auth = require("../middleware/auth");

require("../models/tasks");

const userError = (res, message) => {
  res.status(400).json({ message });
};
const serverError = (res, error) => {
  return res.status(500).json({ error: error.message });
};

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user;
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (err) {
    return serverError(res, err);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      userError(res, "not all fields has been filled");
    }
    const userId = req.user;
    const task = new Task({ title, description, userId });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    return serverError(res, err);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const userId = req.user;
    const task = await Task.findById(_id);
    console.log(task);
    const newTask = {
      title: task.title,
      description: task.description,
      completed: !task.completed,
      _id,
      userId,
    };
    await Task.updateOne({ _id, userId }, newTask);
    res.json(newTask);
  } catch (err) {
    return serverError(res, err);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const userId = req.user;
    await Task.deleteOne({ _id, userId });
    res.status(204).json({ status: "task deleted" });
  } catch (err) {
    return serverError(res, err);
  }
});

module.exports = router;
