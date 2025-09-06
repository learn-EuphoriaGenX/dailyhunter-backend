const { verifyJWT } = require("../utils/jwt.utils")

module.exports.auth = (req, res, next) => {
    try {
        let token = req.headers?.authorization
        if (!token) {
            return res.status(400).send({ success: false, message: "No Token Provided" })
        }
        let decoded = verifyJWT(token)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message || "Internal Server Problem" })
    }

}