const express = require('express');
const router = express.Router();
const Notification =  require('./notifModel.js');
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: `nadunlol999@gmail.com`,
        pass: `fady gnlp yapg rovw`
    }
});

//sends email notification when a new notification is added
const sendEmail = (mailOptions) => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};



// Define routes
//get All notifications fro a user
router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const notifications = await Notification.find({ userId });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

//add notification and send email
router.post('/', async (req, res) => {
    console.log('recived :', req.body);
    const { userId, message } = req.body;
    try {
        //add notification
        await new Notification({ userId, message }).save();
        //send email
        const mailOptions = {
            to: 'learner@blondmail.com', // list of receivers
            subject: "LMS - You Have A Notification", // Subject line
            html: `${req.body.message || "you have a notification"}` // html body
        };
        
        sendEmail(mailOptions);

        res.status(201).json({ message: 'Notification sent' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

//delete notification
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const notification = await Notification.findByIdAndDelete(id);
        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
