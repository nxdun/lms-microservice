const mongoose = require('mongoose');

// define schema
const notificationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// create model
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;