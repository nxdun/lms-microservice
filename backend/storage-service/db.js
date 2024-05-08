const mongoose = require('mongoose');
require('dotenv').config();

// Retrieve MongoDB URI from environment variables
const uri = process.env.DB;

const connection = async () => {
    try {
        // Connect to MongoDB using the retrieved URI
        await mongoose.connect(uri);
        console.log('Connected to database successfully');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
};

module.exports = connection;
