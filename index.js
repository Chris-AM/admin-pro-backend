require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config')

const app = express();
const port = process.env.PORT;

//db
dbConnection()

app.use(cors());

//getting and persering body
app.use(express.json());

//routes
app.use('/api/users', require('./routes/users.routes'));


//port
app.listen(port, () => {
    console.log('listeing on port', port);
})


