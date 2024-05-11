const router = require('express').Router();
const { User } = require('../models/user');

const { logger } = require('./logger');

//validate function
const joi = require('joi');
const bcrypt = require('bcryptjs');
const axios = require('axios');

router.post("/", async (req, res) => {
    try{
        //validate user input data
        const {error} = validate(req.body);
        if(error){
            logger.error('Validation error:', error);
            return res.status(400).send(`val error ${error.details[0].message} error is  ${error} body ${JSON.stringify(req.body)}`);
        }    

        //find user with same email
        const user = await User.findOne({email: req.body.email});
        if(!user){
            logger.info('Invalid email or password:', req.body.email);
            return res.status(401).send({message: "Invalid email or password!"});
        }

        //compare passwords
        const validPassword = await  bcrypt.compare(
            req.body.password, user.password
            );  
        if(!validPassword){
            logger.info('Invalid email or password:', req.body.email);
            return res.status(401).send({message: "Invalid email or password!"});
        }

        //generate authentication token
        const token = user.generateAuthToken();
        logger.info('Login successful for user:', req.body.email);
        res.status(200).send({ data: { token, role: user.role }, message: "Login successful!" });
        //send a welcome notification

    }catch(error){
        //error handling
        logger.error('Internal server error:', error);
        res.status(500).send({message: "Internal server error!"});

    }
});

const validate = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label("Email"),
        password: joi.string().required().label("Password")
    });
    return schema.validate(data);
}    
module.exports = router;