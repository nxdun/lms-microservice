const express = require('express');
const router = express.Router();
const UserController = require('./userProfController'); //import from a package where this function is done

//if there are other course functionalities, add routes here
router.get('/courses', UserController.getUserCourses);

module.exports = router;