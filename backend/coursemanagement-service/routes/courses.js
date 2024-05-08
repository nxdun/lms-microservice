// routes/courses.js
const express = require('express');
const router = express.Router();
const Course = require('../models/course');

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Get a course by ID
router.get('/:id', async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (course == null) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.json(course);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Create a course
router.post('/', async (req, res) => {
  const course = new Course({
    course_title: req.body.course_title,
    course_description: req.body.course_description,
    categories: req.body.categories,
    course_picture: req.body.course_picture,
    price: req.body.price,
    course_duration: req.body.course_duration,
    lecturer_ID: req.body.lecturer_ID
  });

  try {
    const newCourse = await course.save();
    res.status(201).json({ message: 'Course created successfully', course: newCourse });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create course', error: err.message });
  }
});

// Update a course
router.patch('/:id', async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (course == null) {
        return res.status(404).json({ message: 'Course not found' });
      }
      if (req.body.course_title != null) {
        course.course_title = req.body.course_title;
      }
      if (req.body.course_description != null) {
        course.course_description = req.body.course_description;
      }
      if (req.body.categories != null) {
        course.categories = req.body.categories;
      }
      if (req.body.course_picture != null) {
        course.course_picture = req.body.course_picture;
      }
      if (req.body.price != null) {
        course.price = req.body.price;
      }
      if (req.body.course_duration != null) {
        course.course_duration = req.body.course_duration;
      }
      if (req.body.lecturer_ID != null) {
        course.lecturer_ID = req.body.lecturer_ID;
      }
  
      const updatedCourse = await course.save();
      res.json({ message: 'Course updated successfully', course: updatedCourse });
    } catch (err) {
      res.status(400).json({ message: 'Failed to update course', error: err.message });
    }
  });
  

// Delete a course
router.delete('/:id', async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (course == null) {
        return res.status(404).json({ message: 'Course not found' });
      }
      await Course.deleteOne({ _id: req.params.id }); // Use deleteOne() to delete the course
      res.json({ message: 'Course deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete course', error: err.message });
    }
  });


// Approve a course
router.patch('/:id/approve', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (course == null) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Toggle the 'approved' status
    course.approved = !course.approved;
    await course.save();
    
    res.json({ message: 'Course approval status toggled successfully', course });
  } catch (err) {
    res.status(500).json({ message: 'Failed to toggle approval status', error: err.message });
  }
});

module.exports = router;
