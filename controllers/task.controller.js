const User = require("../models/user.model");
const Task = require("../models/task.model");

module.exports.addTask = async (req, res) => {
    let { _id: userId } = req.user
    try {
        let { title, time, priority } = req.body
        if (!title || !time || !priority) {
            return res.status(400).send({ success: false, message: "Please Provide All Details" })
        }
        let newTask = await Task.create({
            title: title,
            time: time,
            priority: priority,
            user: userId
        })
        let user = await User.findById(userId)
        user.tasks.push(newTask._id)
        await user.save()
        return res.status(201).send({ success: true, message: "New Task Addedd Successfully", data: newTask })
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message || "Internal Server Problem" })
    }
};

module.exports.ViewTask = async (req, res) => {
    let { _id: userId } = req.user
    let filter = {
        user: userId
    }
    if (req.query.priority) {
        filter.priority = req.query.priority
    }
    if (req.query.status) {
        filter.status = req.query.status
    }
    try {
        let tasks = await Task.find(filter)
        return res.status(200).send({ success: true, message: "All Tasks", data: tasks })
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message || "Internal Server Problem" })
    }
};

module.exports.deleteTask = async (req, res) => {
    let { _id: userId } = req.user
    let taskId = req.params.id
    try {
        await Task.deleteOne({ _id: taskId, user: userId })
        await User.findByIdAndUpdate(userId, { $pull: { tasks: taskId } })
        return res.status(200).send({ success: true, message: "Task Deleted Successfully" })
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message || "Internal Server Problem" })
    }
};

module.exports.updateTask = async (req, res) => {
    let taskId = req.params.id
    let status = req.params.status
    try {
        if (!status) {
            return res.status(400).send({ success: false, message: "Please Provive Valid Status" })
        }
        await Task.findByIdAndUpdate(taskId, { status })
        return res.status(200).send({ success: true, message: "Task Updated Successfully" })
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message || "Internal Server Problem" })
    }
};
