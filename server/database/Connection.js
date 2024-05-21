const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const DbConnect = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.DB_NAME,
    }).then(() => {
        console.log('Connected to MongoDB');
    }
    ).catch((error) => {
        console.error('Error:', error.message);
    });
}

module.exports = { DbConnect };