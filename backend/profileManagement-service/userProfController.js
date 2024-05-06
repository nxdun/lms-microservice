// controllers/user.controller.js
const User = require('../models/user.model'); //change to user model from auth service

//course related functions for user profile goes here
exports.getUserCourses = async (req, res) => {
  try {
    const userId = req.user.id; // assuming user is authenticated
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let courses = [];

    if (user.role === 'lecturer') { //change with correct user role
      // Get courses created by the lecturer
      courses = await Course.find({ lecturer: userId }); //change with correct user profile

    } else if (user.role === 'student') {
      // Get courses enrolled by the student
      const enrollment = await Enrollment.find({ student: userId }).populate('course');

      if (!enrollment) {
        return res.status(404).json({ message: 'No courses enrolled by the student' });
      }

      courses = enrollment.map(enrollment => enrollment.course);
    }

    res.status(200).json({ courses });
  } catch (error) {
    
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
