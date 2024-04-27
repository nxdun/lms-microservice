const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/login',async (req, res) => {
    const {email, password} = req.body;
    // const response = await axios.post('http://localhost:3001/v1/login', {email, password});
    res.send("Login route send email password to authentication service");
});

router.post('/register',async (req, res) => {
    const {email, password} = req.body;
    // const response = await axios.post('http://localhost:3001/v1/register', {email, password});
    res.send("Register route send email password to authentication service");
});

router.post('/logout',async (req, res) => {
    res.send("Logout route send request to authentication service");
});


module.exports = router;