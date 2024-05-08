import { Grid, } from '@mui/material';
import VideoPlayer from './VideoPlayer.jsx';
import ChapterSelector from './ChapterSelector';
import Quizzes from './Quizzes';
import LearningProgress from './LearningProgress';
import LectureNotes from './LectureNotes';



const LearnCourse = () => {
    return (
        <Grid container spacing={3}>
            {/* Video Section */}
            <Grid item xs={12} md={8}>
            <VideoPlayer src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" />
            </Grid>

            {/* Chapter Selector */}
            <Grid item xs={12} md={4}>
            <ChapterSelector chapters={['Chapter 1', 'Chapter 2', 'Chapter 3']} />
            </Grid>


            {/* Other Skeletons */}
            <Grid item xs={12} md={6}>
            <Quizzes questions={['Question 1', 'Question 2', 'Question 3']} />

            </Grid>

            <Grid item xs={12} md={6}>
            <LearningProgress progress={50} />
            </Grid>

            <Grid item xs={12}>
            <LectureNotes notes={['Note 1', 'Note 2', 'Note 3']} />

            </Grid>
        </Grid>
    );
};

export default LearnCourse;
