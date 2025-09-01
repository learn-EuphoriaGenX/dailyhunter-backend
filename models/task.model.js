const mongoose = require('mongoose')
const { Schema, model } = mongoose

const taskSchema = new Schema({
    title: { // Fix Login Bug
        type: String,
        trim: true,
        required: true
    },
    time: { // 3h , 2m
        type: String,
        trim: true,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending',
        required: true
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Critical'],
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

module.exports = model('Task', taskSchema)
