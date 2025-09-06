// import { express } from 'express'; // module syntax
const express = require('express'); // CommonJS syntax
const app = express();
const cors = require("cors")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const { dbConnection } = require('./config/db.config');

app.get('/', (req, res) => {
    res.send('Hello World! hii from express');
});

const userRoutes = require('./routes/user.routes');
app.use('/api/users', userRoutes);
const tasksRoutes = require('./routes/task.route');
app.use("/api/task", tasksRoutes)



const port = process.env.PORT || 3000;
dbConnection()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    })