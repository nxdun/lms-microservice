const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

//validation function
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');


const userSchema = new mongoose.Schema({
    firstName:{ type: String, required: true },
    lastName:{ type: String, required: true },
    email:{ type: String, required: true },
    password:{ type: String, required: true }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ 
        _id: this._id,
    }, process.env.JWTPRIVATEKEY, { expiresIn: '1d' });
    return token;
};

const User = mongoose.model('User', userSchema);

const validate = (data) => {
    const schema = joi.object({
        firstName: joi.string().required().label("First Name"),
        lastName: joi.string().required().label("Lirst Name"),
        email: joi.string().required().label("Email"),
        password: passwordComplexity().required().label("Password")
    });
    return schema.validate(data);
}

module.exports = { User, validate };