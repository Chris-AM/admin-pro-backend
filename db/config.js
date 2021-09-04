const mongoose = require('mongoose');

const DB_CNN = process.env.DB_CNN;

const dbConnection = async () => {
    try {
        await mongoose.connect(DB_CNN, {    
        });
        console.log('Connection succsessful');
    } catch (error) {
        console.error(error);
        throw new Error('Error trying to connect');
    }
}

module.exports = {
    dbConnection 
}