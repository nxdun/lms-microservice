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
        console.log(error);
        res.status(500).send({message: "Internal Server Error!"});
        
    }
})


//post for adding enrolled courses for giver _id
router.post("/addcourse/:id", async (req, res) => {
    try{
        //validate id param as mongo id
        if(!req.params.id.match(/^[0-9a-fA-F]{24}$/)){
            logger.info('Invalid user id:', req.params.id);
            return res.status(400).send({message: "Invalid user id!"});
        }
        //find user with given email
        const user = await User.findOne({_id: req.params.id});
        if(!user){
            logger.info('User not found:', req.body.email);
            return res.status(404).send({message: "User not found!"});
        }
        //validate user role allow learner and admin only
        if(user.role === 'learner'){
            logger.info('User not authorized to add course:', req.body.email);
            return res.status(403).send({message: "User not authorized to add course!"});
        }
        //add course to enrolled courses
        user.createdCourses.push(req.body.course);
        await user.save();
        logger.info('Course added successfully:', req.body.course);
        res.status(200).send({message: "Course added successfully!"});
    }catch(error){
        //error handling
        console.log(error);
        res.status(500).send({message: "Internal Server Error!"});
    }
});

//enroll to course
router.post("/enroll/:id", async (req, res) => {
    try{
        //validate id param as mongo id
        if(!req.params.id.match(/^[0-9a-fA-F]{24}$/)){
            logger.info('Invalid user id:', req.params.id);
            return res.status(400).send({message: "Invalid user id!"});
        }
        //find user with given email
        const user = await User.findOne({_id: req.params.id});
        if(!user){
            logger.info('User not found:', req.body.email);
            return res.status(404).send({message: "User not found!"});
        }
        //check if course already enrolled
        if(user.enrolledCourses.includes(req.body.course)){
            logger.info('Course already enrolled:', req.body.course);
            return res.status(409).send({message: "Course already enrolled!"});
        }
        //add course to enrolled courses
        user.enrolledCourses.push(req.body.course);
        await user.save();
        logger.info('Course enrolled successfully:', req.body.course);
        res.status(200).send({message: "Course enrolled successfully!"});
    }catch(error){
        //error handling
        console.log(error);
        res.status(500).send({message: "Internal Server Error!"});
    }
});

//unenroll from course
router.delete("/enroll/:id", async (req, res) => {
    try{
        //validate id param as mongo id
        if(!req.params.id.match(/^[0-9a-fA-F]{24}$/)){
            logger.info('Invalid user id:', req.params.id);
            return res.status(400).send({message: "Invalid user id!"});
        }
        //find user with given email
        const user = await User.findOne({_id: req.params.id});
        if(!user){
            logger.info('User not found:', req.body.email);
            return res.status(404).send({message: "User not found!"});
        }
    
        //remove course from enrolled courses
        user.enrolledCourses.pull(req.body.course);
        await user.save();
        logger.info('Course unenrolled successfully:', req.body.course);
        res.status(200).send({message: "Course unenrolled successfully!"});
    }catch(error){
        //error handling
        console.log(error);
        res.status(500).send({message: "Internal Server Error!"});
    }
});

// Route to get all users
router.get("/", async (req, res) => {
    try{
        //get all users
        const users = await User.find();
        logger.info('All users fetched successfully:', users);
        res.status(200).send(users);
    }catch(error){
        //error handling
        console.log(error);
        res.status(500).send({message: "Internal Server Error!"});
    }
});


module.exports = router;