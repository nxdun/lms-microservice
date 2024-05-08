const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  course_title: {
    type: String,
    required: true
  },
  course_description: {
    type: String,
    required: true
  },
  categories: {
    type: [String],
    required: true
  },
  course_picture: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  course_duration: {
    type: String,
    required: true
  },
  lecturer_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lecturer', // Assuming there's a Lecturer model
    required: true
  },
  approved: {
    type: Boolean,
    default: false // Default value is false
  }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
