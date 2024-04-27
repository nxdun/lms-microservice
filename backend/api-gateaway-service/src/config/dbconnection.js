/*
*       This file is responsible for connecting and disconnecting from the MongoDB database.
*       Returns a connection object if the connection is successful.
*       Logs an error if the connection fails..
*/

const mongoose = require('mongoose');
const Logger = require('./logger.js');
require('dotenv').config();
let database;

// Connect to the database
const connect = async () => {
    const uri = process.env.MONGOSTRING;
    if(database) return;

    mongoose.connect(uri)
    .then((connection) => {
        database = connection;
        Logger.info('Database connection established');
    })
    .catch((error) => {
        Logger.error(error);
    })

};

// Disconnect from the database
const disconnect = async () => {
    if(!database) return;

    mongoose.disconnect()
    .then(() => {
        Logger.info('Database connection closed');
    })
    .catch((error) => {
        Logger.error(error);
    })
}


module.exports = {connect, disconnect};