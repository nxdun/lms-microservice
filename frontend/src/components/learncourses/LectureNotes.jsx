import { useState, useEffect } from 'react';
import { Paper, Divider, Typography, TextField, Button, Grid, Chip, Skeleton } from '@mui/material';
import PropTypes from 'prop-types';

const LectureNotes = ({ notes }) => {
    const [noteText, setNoteText] = useState('');
    const [savedNotes, setSavedNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load previous notes from local storage on component mount
    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem(notes)) || [];
        setSavedNotes(storedNotes);
        setLoading(false);
    }, [notes]);

    // Save note to local storage and state
    const saveNote = () => {
        if (noteText.trim() !== '') {
            const updatedNotes = [...savedNotes, { text: noteText, color: 'default' }];
            localStorage.setItem(notes, JSON.stringify(updatedNotes));
            setSavedNotes(updatedNotes);
            setNoteText('');
        }
    };

    // Clear all notes from local storage and state
    const clearNotes = () => {
        localStorage.removeItem(notes);
        setSavedNotes([]);
    };

    // Handle click on a chip to retrieve the note
    const handleChipClick = (note) => {
        setNoteText(note.text);
    };

    return (
        <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>Lecture Notes</Typography>
            <Divider />
            {loading ? (
                // Skeleton loader when loading
                <Skeleton variant="rectangular" height={200} />
            ) : (
                <>
                    {/* Input field for adding new notes */}
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                label="Add Note"
                                sx={{ pb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} textAlign="center">
                            <Button variant="contained" onClick={saveNote}>Add</Button>
                        </Grid>
                    </Grid>
                    {/* Display saved notes as chips */}
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="subtitle1" gutterBottom>Previous Notes:</Typography>
                    <Grid container spacing={1}>
                        {savedNotes.map((note, index) => (
                            <Grid item key={index}>
                                <Chip label={note.text} onClick={() => handleChipClick(note)} />
                            </Grid>
                        ))}
                    </Grid>
                    {savedNotes.length === 0 && <Typography>No notes available.</Typography>}
                    {/* Button to clear all notes */}
                    {savedNotes.length > 0 && <Button variant="outlined" color="error" onClick={clearNotes}>Clear All Notes</Button>}
                </>
            )}
        </Paper>
    );
};

export default LectureNotes;

LectureNotes.propTypes = {
    notes: PropTypes.string.isRequired,
};
