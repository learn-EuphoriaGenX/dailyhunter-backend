const User = require("../models/user.model");
const { createJWT } = require("../utils/jwt.utils");
const { encryptedPassword, decryptedPassword } = require("../utils/password.utils");

module.exports.registerUser = async (req, res) => {
    try {
        let { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).send({ success: false, message: "Please Provide Valid Details" })
        }
        let existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(400).send({ success: false, message: "Email already Register" })
        }

        let hashed = await encryptedPassword(password)
        let newUser = await User.create({
            name: name,
            email: email,
            password: hashed

        })

        delete newUser._doc.password
        return res.status(201).send({ success: true, message: "User Registered Successfully", data: newUser })
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message || "Internal Server Problem" })
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        let { email, password } = req.body
        if (!email || !password) {
            return res.status(400).send({ success: false, message: "Please Provide Valid Details" })
        }
        let existingUser = await User.findOne({ email: email })
        if (!existingUser) {
            return res.status(400).send({ success: false, message: "User Does'nt Exists!" })
        }

        let isMatch = await decryptedPassword(password, existingUser.password)
        if (!isMatch) {
            return res.status(400).send({ success: false, message: "Incorrect Credential!" })
        }

        delete existingUser._doc.password
        // create JWT
        let payload = {
            _id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
        }
        let token = await createJWT(payload)
        return res.status(200).send({ success: true, message: "User Login Successfully", data: existingUser, token })
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message || "Internal Server Problem" })
    }
};

module.exports.profile = async (req, res) => {
    let { _id } = req.user
    try {
        let user = await User.findById(_id).populate('tasks', 'title time status priority')
        let token = req.headers?.authorization
        if (!user) {
            return res.status(400).send({ success: false, message: "User Does'nt Exists!" })
        }
        return res.status(200).send({ success: true, message: "User Profile", data: user, token })

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message || "Internal Server Problem" })
    }
};