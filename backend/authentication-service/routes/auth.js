const router = require('express').Router();
const { User } = require('../models/user');

const { logger } = require('./logger');

//validate function
const joi = require('joi');

const bcrypt = require('bcrypt');

router.post("/", async (req, res) => {
    try{
        const {error} = validate(req.body);
        if(error){
            logger.error('Validation error:', error);
            return res.status(400).send({message: error.details[0].message});
        }    
        const user = await User.findOne({email: req.body.email});
        if(!user){
            logger.info('Invalid email or password:', req.body.email);
            return res.status(401).send({message: "Invalid email or password!"});
        }
        const validPassword = await  bcrypt.compare(
            req.body.password, user.password
            );  
        if(!validPassword){
            logger.info('Invalid email or password:', req.body.email);
            return res.status(401).send({message: "Invalid email or password!"});
        }
        const token = user.generateAuthToken();
        logger.info('Login successful for user:', req.body.email);
        res.status(200).send({ data: token,  message: "Login successful!" });
    }catch(error){
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