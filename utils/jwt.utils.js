const jwt = require('jsonwebtoken')

module.exports.createJWT = (payload) => {
    let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY })
    return token;
}

module.exports.verifyJWT = (token) => {
    let verify = jwt.verify(token, process.env.JWT_SECRET)
    return verify;
}