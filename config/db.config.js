const { MONGO_URL } = process.env
const mongoose = require('mongoose')

module.exports.dbConnection = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log("Database Connected Successfully 📅");
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
