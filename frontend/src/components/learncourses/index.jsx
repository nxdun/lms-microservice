import { useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Button } from "@mui/material";
import VideoPlayer from "./VideoPlayer.jsx";
import ChapterSelector from "./ChapterSelector";
import Quizzes from "./Quizzes";
import LectureNotes from "./LectureNotes";
import Swal from "sweetalert2";
import axios from "axios";

const LearnCourse = () => {
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);

  const handleChapterSelect = (index) => {
    setSelectedChapterIndex(index);
    console.log("Selected chapter index:", index);
  };
  //TODO: add user id
  const userid = "6639f81959d9bb8f4301ea7a"; // Sample user ID, replace with actual user ID
  const { id } = useParams();
  // Validate course ID
  console.log(id);

  // Define constants for video URLs, chapters, and quizzes
  const videoURLs = [
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
  ];

  const chapters = ["Chapter 1", "Chapter 2"];

  const quizzes = [
    {
      question: "What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Madrid"],
      correctAnswerIndex: 1,
    },
  ];

  const lectureNotes = [];

  const unenrollNow = () => {
    // Axios DELETE request to unenroll from course
    axios
      .delete(`http://localhost:2222/api/v1/users/enroll/${userid}`, {
        data: {
          course: id, // Sample body, replace with actual course ID
        },
      })
      .then((response) => {
        console.log(response);
        Swal.fire({
          icon: "success",
          title: "Unenrollment successful!",
          text: `You have been unenrolled from this course ${response.status}!`,
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Please try again.",
        });

      });
  };

  

  const handleUnenroll = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be unenrolled from this course!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, unenroll me!",
      cancelButtonText: "No, keep me enrolled",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Unenrollment started!",
          "You have been unenrolled from this course.",
          "success"
        );
        unenrollNow();
      }
    });
  };

  return (
    <Grid container spacing={3}>
      {/* Video Section */}
      <Grid item xs={12} md={8}>
        {/* Pass selected chapter index to the VideoPlayer component */}
        <VideoPlayer
          src={videoURLs}
          selectedChapterIndex={selectedChapterIndex}
        />
      </Grid>

      {/* Chapter Selector */}
      <Grid item xs={12} md={4}>
        {/* Pass handleChapterSelect function to ChapterSelector component */}
        <ChapterSelector
          chapters={chapters}
          onSelectChapter={handleChapterSelect}
          id={id}
        />
      </Grid>

      {/* Quizzes */}
      <Grid item xs={12} md={6}>
        <Quizzes questions={quizzes} />
      </Grid>

      {/* Lecture Notes */}
      <Grid item xs={12} md={6}>
        <LectureNotes notes={lectureNotes} />
      </Grid>

      {/* Unenroll Button */}
      <Grid item xs={12} md={12}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleUnenroll}
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Unenroll from Course
        </Button>
      </Grid>
    </Grid>
  );
};

export default LearnCourse;
