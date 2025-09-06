const express = require('express');
const { addTask, ViewTask, deleteTask, updateTask } = require('../controllers/task.controller');
const { auth } = require('../middleware/auth.middleware');
const router = express.Router();

router.post("/add", auth, addTask);
router.get("/view", auth, ViewTask);
router.delete("/delete/:id", auth, deleteTask);
router.put("/update/:id/:status", auth, updateTask);


module.exports = router;
