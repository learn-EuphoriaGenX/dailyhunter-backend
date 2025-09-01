const bcrypt = require('bcrypt')

// Encrypt password
module.exports.encryptedPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        return hashedPassword
    } catch (err) {
        throw new Error('Error encrypting password: ' + err.message)
    }
}

module.exports.decryptedPassword = async (userEnteredPassword, storedPassword) => {
    try {
        const isMatch = await bcrypt.compare(userEnteredPassword, storedPassword)
        return isMatch
    } catch (err) {
        throw new Error('Error comparing passwords: ' + err.message)
    }
}
