const router = require('express').Router();
const { User, validate } = require('../models/user');
const bcrypt = require('bcryptjs'); //for password hashing

const { logger } = require('./logger');

//route handler for user creation
//send post request to '/' endpoint //change endpoint later!
router.post("/", async (req, res) => {
    try{
        //validate user input
        const{error} = validate(req.body);
        if(error){
            logger.error('Validation error:', error);
            return res.status(400).send({message: error.details[0].message});
        }

        //check if user with entered email already exists
        const user = await User.findOne({email: req.body.email});
        if(user){
            logger.info('User with given email already exists:', req.body.email);
            return res.status(409).send({message: "User with given email already exist!"});
        }

        //generate salt and hash pw
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        //hashing password    
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        //create user with password and save to db
        await new User({...req.body, password: hashedPassword}).save();
        logger.info('User created successfully:', req.body.email);

        //send success message
        res.status(201).send({message: "User created successfully!"});
    }catch(error){
        //error handling
        logger.error('Internal Server Error:', error);
        res.status(500).send({message: "Internal Server Error!"});
        
    }
})

module.exports = router;