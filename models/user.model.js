const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    }]
}, { timestamps: true })

module.exports = model('User', userSchema)