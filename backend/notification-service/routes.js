const express = require('express');
const router = express.Router();
const Notification =  require('./notifModel.js');

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

router.post('/', async (req, res) => {
    console.log('recived :', req.body);
    const { userId, message } = req.body;
    try {
        //add notification
        await new Notification({ userId, message }).save();
        res.status(201).json({ message: 'Notification sent' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

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
