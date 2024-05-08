import { useState } from "react";
import { Grid } from "@mui/material";
import VideoPlayer from "./VideoPlayer.jsx";
import ChapterSelector from "./ChapterSelector";
import Quizzes from "./Quizzes";
import LearningProgress from "./LearningProgress";
import LectureNotes from "./LectureNotes";

const LearnCourse = () => {
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);

  const handleChapterSelect = (index) => {
    setSelectedChapterIndex(index);
    console.log("Selected chapter index:", index);
  };

  return (
    <Grid container spacing={3}>
      {/* Video Section */}
      <Grid item xs={12} md={8}>
        {/* Pass selected chapter index to the VideoPlayer component */}
        <VideoPlayer
          src={[
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
          ]}
          selectedChapterIndex={selectedChapterIndex}
        />
      </Grid>

      {/* Chapter Selector */}
      <Grid item xs={12} md={4}>
        {/* Pass handleChapterSelect function to ChapterSelector component */}
        <ChapterSelector
          chapters={["Chapter 1", "Chapter 2"]}
          onSelectChapter={handleChapterSelect}
        />
      </Grid>

      {/* Other Skeletons */}
      <Grid item xs={12} md={6}>
        <Quizzes
          questions={[
            {
              question: "What is the capital of France?",
              options: ["London", "Paris", "Berlin", "Madrid"],
              correctAnswerIndex: 1, // Paris is the correct answer
            },
          ]}
        />
      </Grid>

      <Grid item xs={12} md={6}>
      <LectureNotes notes={["abcd"]} />
      </Grid>

  
    </Grid>
  );
};

export default LearnCourse;
