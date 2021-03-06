require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config')

const app = express();
const port = process.env.PORT;

//db
dbConnection()

app.use(cors());

//port
app.listen(port, () => {
    console.log('listeing on port', port);
})

//routes
app.get('/', (reques, response) => {
    response.json({
        ok: true,
        message: 'You did it well'
    })
})

