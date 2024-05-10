const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

//validation function
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

//defining user Schema
const courseSchema = new mongoose.Schema({
    course_id: { type: mongoose.Schema.Types.ObjectId, unique: true},
    approved: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['learner', 'lecturer', 'admin'], default: 'learner' },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId }], // For learners or lecturers
    createdCourses: [courseSchema] // For lecturers only
});


//token generation method
//token generated using user id and private key
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ 
        _id: this._id,email: this.email,role: this.role
    }, process.env.JWTPRIVATEKEY, { expiresIn: '1d' });
    return token;
};

//user model based on user schema; 
//use to interact with mongodb user collection
const User = mongoose.model('User', userSchema);

//define validation func.
//validate user input against joi schema
const validate = (data) => {
    const schema = joi.object({
        firstName: joi.string().required().label("First Name"),
        lastName: joi.string().required().label("Lirst Name"),
        email: joi.string().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        role: joi.string().valid('learner', 'lecturer', 'admin').required().label("Role")
    });

    // Set default role to 'student' if not provided
    if (!data.role) {
        data.role = 'learner';
    }

    return schema.validate(data);
}

module.exports = { User, validate };