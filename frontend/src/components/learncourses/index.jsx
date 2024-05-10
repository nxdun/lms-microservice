import { useState } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import VideoPlayer from "./VideoPlayer.jsx";
import ChapterSelector from "./ChapterSelector";
import Quizzes from "./Quizzes";
import LectureNotes from "./LectureNotes";

const LearnCourse = () => {
    
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);

  const handleChapterSelect = (index) => {
    setSelectedChapterIndex(index);
    console.log("Selected chapter index:", index);
  };

  const { id } = useParams();
  // Validate course ID
  console.log(id);

  // Define constants for video URLs, chapters, and quizzes
  const videoURLs = [
    // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
  ];

  const chapters = [
    // "Chapter 1", "Chapter 2"
  ];

  const quizzes = [
    // {
    //   question: "What is the capital of France?",
    //   options: ["London", "Paris", "Berlin", "Madrid"],
    //   correctAnswerIndex: 1, 
    // },
  ];

  const lectureNotes = [
    // "abcd"
  ];

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
    </Grid>
  );
};

export default LearnCourse;
