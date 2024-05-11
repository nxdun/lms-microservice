import { useState, useEffect } from "react";
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
  const [videoURLs, setVideoURLs] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [progressPercentage, setProgressPercentage] = useState(0);

  console.log("SIUUUU progressPercentage:", progressPercentage);
  const handleChapterSelect = (index) => {
    setSelectedChapterIndex(index);
    console.log("Selected chapter index:", index);
    calculateProgressPercentage(index);
  };

  const { id } = useParams();

  useEffect(() => {
    // Fetch course content
    axios
      .get(`http://localhost:5000/addcoursecontent/${id}`)
      .then((response) => {
        const { videoUrls, chapters, quizzes } = response.data;
        setVideoURLs(videoUrls);
        setChapters(chapters);
        setQuizzes(quizzes);
        console.log("Course content:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching course content:", error);
      });
  });

  const calculateProgressPercentage = (selectedChapterIndex) => {
    const totalChapters = chapters.length;
    const completedChapters = selectedChapterIndex + 1;
    const percentage = (completedChapters / totalChapters) * 100;
    setProgressPercentage(percentage);
  };

  const unenrollNow = () => {
    // Axios DELETE request to unenroll from course
    axios
      .delete(`http://localhost:2222/api/v1/users/enroll/${localStorage.getItem("token")}`, {
        data: {
          course: id, 
        },
      })
      .then((response) => {
        console.log("Unenrolled from course:", response.data.message);
        window.location.href = "/browse";
      })
      .catch((error) => {
        console.error("Error:", error);
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
          "Unenrolled!",
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
        <LectureNotes notes={id.toString()} />
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
