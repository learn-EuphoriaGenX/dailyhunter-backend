const express = require('express');
const { addTask, ViewTask, deleteTask, updateTask } = require('../controllers/task.controller');
const router = express.Router();

router.post("/add", addTask);
router.get("/view", ViewTask);
router.delete("/delete", deleteTask);
router.put("/update", updateTask);


module.exports = router;
