import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Paper, Divider, Typography, Checkbox, Skeleton } from "@mui/material";

const ChapterSelector = ({
  chapters,
  onSelectChapter,
  selectedChapterIndex,
  id,
}) => {
  const [checkedChapters, setCheckedChapters] = useState(
    chapters.map((_, index) => index === selectedChapterIndex)
  );
  const [progress, setProgress] = useState(null); // Progress state

  const handleChapterToggle = (index) => {
    const updatedCheckedChapters = [...checkedChapters];
    updatedCheckedChapters[index] = !updatedCheckedChapters[index];
    setCheckedChapters(updatedCheckedChapters);
    onSelectChapter(index);
  };

  // Calculate the percentage of chapters completed
  const calculateProgress = () => {
    const completedChapters = checkedChapters.filter(
      (isChecked) => isChecked
    ).length;
    const totalChapters = chapters.length;
    const percentage = (completedChapters / totalChapters) * 100;
    return Math.round(percentage);
  };

  // Retrieve current progress from localStorage
  useEffect(() => {
    const storedProgress = parseInt(localStorage.getItem(`${id}`));
    if (!isNaN(storedProgress)) {
      setProgress(storedProgress);
    }
  }, [id]);

  // Update localStorage with progress if it's not NaN
  useEffect(() => {
    if (!isNaN(progress)) {
      localStorage.setItem(`${id}`, progress);
    }
  }, [progress, id]);

  // Skeleton loader when progress is NaN
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

ChapterSelector.propTypes = {
  chapters: PropTypes.array.isRequired,
  onSelectChapter: PropTypes.func.isRequired,
  selectedChapterIndex: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};
