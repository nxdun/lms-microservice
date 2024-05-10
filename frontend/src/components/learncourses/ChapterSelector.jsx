import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Paper, Divider, Typography, Checkbox, Skeleton } from "@mui/material";

//comp. for selecting chapters with progress tracking
const ChapterSelector = ({
  chapters,
  onSelectChapter,
  selectedChapterIndex,
  id,
}) => {
  //state for tracking checked chapters
  const [checkedChapters, setCheckedChapters] = useState(
    chapters.map((_, index) => index === selectedChapterIndex)
  );

  //state for tracking progress percentage
  const [progress, setProgress] = useState(null); // Progress state
  
  //functionto handle chapter toggle
  const handleChapterToggle = (index) => {
    const updatedCheckedChapters = [...checkedChapters];
    updatedCheckedChapters[index] = !updatedCheckedChapters[index];
    setCheckedChapters(updatedCheckedChapters);
    onSelectChapter(index);
  };

  useEffect(() => {
  //function to calculate progress percentage
  const calculateProgress = () => {
    const completedChapters = checkedChapters.filter(
      (isChecked) => isChecked
    ).length;
    const totalChapters = chapters.length;
    const percentage = (completedChapters / totalChapters) * 100;
    return Math.round(percentage);
  };

  //effect to get current progress from localStorage
    const storedProgress = parseInt(localStorage.getItem(`${id}`));
    if (!isNaN(storedProgress)) {
      setProgress(storedProgress);
    }
      setProgress(calculateProgress);
    
  }, [id, checkedChapters, chapters.length]);

  //effect to update localStorage with progress if not NaN
  useEffect(() => {
    if (!isNaN(progress)) {
      localStorage.setItem(`${id}`, progress);
    }
  }, [progress, id]);

  //render skeleton loader if progress is NaN
  if (isNaN(progress)) {
    return (
      <Paper
        elevation={3}
        style={{ padding: "20px", minHeight: "94%", overflow: "auto" }}
      >
        <Typography variant="h6" gutterBottom>
          Chapter Selector
        </Typography>
        <Divider />
        <Skeleton variant="rectangular" height={200} />
      </Paper>
    );
  }

  //render chapter selector with checkboxes and progress statistcs
  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", minHeight: "94%", overflow: "auto" }}
    >
      <Typography variant="h6" gutterBottom>
        Chapter Selector
      </Typography>
      <Divider />
      {/* Checkbox for each chapter */}
      {chapters.map((chapter, index) => (
        <div
          key={index}
          onClick={() => handleChapterToggle(index)}
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            padding: "10px",
            marginBottom: "5px",
            borderRadius: "5px",
            backgroundColor: checkedChapters[index] ? "#e0e0e0" : "transparent",
          }}
        >
          <Checkbox checked={checkedChapters[index]} color="primary" />
          <Typography variant="body1">{chapter}</Typography>
        </div>
      ))}
      {/* Progress statistics */}
      <Typography variant="body2" style={{ marginTop: "10px" }}>
        Progress: {progress}%
      </Typography>
    </Paper>
  );
};

export default ChapterSelector;

//define prop types fro chapterSelector comp
ChapterSelector.propTypes = {
  chapters: PropTypes.array.isRequired,
  onSelectChapter: PropTypes.func.isRequired,
  selectedChapterIndex: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};