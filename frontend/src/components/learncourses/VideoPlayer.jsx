import { useRef, useState, useEffect } from 'react';
import { Paper, Typography, IconButton, Slider } from '@mui/material';
import { PlayArrow, Pause, Replay10, Forward10, Fullscreen } from '@mui/icons-material';
import PropTypes from 'prop-types';

const VideoPlayer = ({ src, selectedChapterIndex }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // Play or pause the video
    const handlePlayPause = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    // Update current time of the video
    const updateTime = () => {
        setCurrentTime(videoRef.current.currentTime);
    };

    // Seek video backward by 10 seconds
    const seekBackward = () => {
        videoRef.current.currentTime -= 10;
    };

    // Seek video forward by 10 seconds
    const seekForward = () => {
        videoRef.current.currentTime += 10;
    };

    // Toggle fullscreen mode
    const toggleFullScreen = () => {
        if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen();
        }
    };

    // Format time in mm:ss format
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    // Update video source when selected chapter changes
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
        }
    }, [selectedChapterIndex]);

    return (
        <Paper elevation={3} style={{ padding: '20px' }}>
            {/* Video player */}
            <video
                ref={videoRef}
                controls={false}
                onTimeUpdate={updateTime}
                onLoadedMetadata={() => setDuration(videoRef.current.duration)}
                style={{ width: '100%', marginBottom: '20px', minHeight: '300px' }}
            >
                <source src={src[selectedChapterIndex]} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Playback controls */}
            <div style={{ textAlign: 'center' }}>
                <IconButton onClick={seekBackward}>
                    <Replay10 />
                </IconButton>
                <IconButton onClick={handlePlayPause}>
                    {isPlaying ? <Pause /> : <PlayArrow />}
                </IconButton>
                <IconButton onClick={seekForward}>
                    <Forward10 />
                </IconButton>
                <IconButton onClick={toggleFullScreen}>
                    <Fullscreen />
                </IconButton>
            </div>

            {/* Current time and duration */}
            <Typography variant="body2">
                {`${formatTime(currentTime)} / ${formatTime(duration)}`}
            </Typography>

            {/* Progress bar */}
            <Slider
                value={(currentTime / duration) * 100}
                onChange={(event, newValue) => {
                    videoRef.current.currentTime = (newValue / 100) * duration;
                }}
                aria-labelledby="progress-slider"
                min={0}
                max={100}
            />
        </Paper>
    );
};

export default VideoPlayer;

VideoPlayer.propTypes = {
    src: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedChapterIndex: PropTypes.number.isRequired,
};
