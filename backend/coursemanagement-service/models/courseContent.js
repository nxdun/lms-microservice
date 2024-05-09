const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Quiz sub-schema
const QuizSchema = new Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswerIndex: { type: Number, required: true }
});

// Define the main Course schema
const CourseSchema = new Schema({
  videoUrls: [{ type: String, required: true }],
  chapters: [{ type: String, required: true }],
  quizzes: [QuizSchema],
  //object id of course content
  courseId: { type: Schema.Types.ObjectId, required: true }
});

// Create a Mongoose model
const CourseModel = mongoose.model('CourseContent', CourseSchema);

module.exports = CourseModel;
