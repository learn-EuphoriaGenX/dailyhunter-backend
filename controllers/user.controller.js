const User = require("../models/user.model");
const { encryptedPassword, decryptedPassword } = require("../utils/password.utils");

module.exports.registerUser = async (req, res) => {
    try {
        let { email, password } = req.body
        if (!email || !password) {
            return res.status(400).send({ success: false, message: "Please Provide Valid Details" })
        }
        let existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(400).send({ success: false, message: "Email already Register" })
        }

        let hashed = await encryptedPassword(password)
        let newUser = await User.create({
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
        return res.status(200).send({ success: true, message: "User Login Successfully", data: existingUser })
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message || "Internal Server Problem" })
    }
};
module.exports.profile = (req, res) => {
    res.send("User profile Endpoint");
};