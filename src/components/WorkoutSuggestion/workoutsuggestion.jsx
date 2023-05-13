import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';

const WorkoutSuggestion = () => {
    const [formValues, setFormValues] = useState({
        gender: '',
        primaryGoal: '',
        trainingMethod: '',
        workoutType: '',
        routineFocus: '',
        strengthLevel: '',
        trainingDays: '',
        workoutTime: '',
    });
    const [workoutSuggestion, setWorkoutSuggestion] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fixedWorkoutTime = formValues.workoutTime.replace(" mins", " minutes");

        const response = await fetch('http://localhost:5000/workout/generate-workout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formValues, workoutTime: fixedWorkoutTime }),
        });
        const data = await response.json();
        setWorkoutSuggestion(data.workoutSuggestion);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                py: 4,
                borderRadius: '16px',
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#ffffff',
                maxWidth: '800px',
                margin: '32px auto',
                px: 3,
                pt: 5,
                pb: 3,
            }}
        >
            <Typography variant="h4" sx={{ mb: 4 }}>
                Workout Suggestion
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="standard" sx={{ mb: 2 }}>
                        <InputLabel>Gender</InputLabel>
                        <Select name="gender" value={formValues.gender} onChange={handleChange} required>
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth variant="standard" sx={{ mb: 2 }}>
                        <InputLabel>Primary Goal</InputLabel>
                        <Select
                            name="primaryGoal"
                            value={formValues.primaryGoal}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="lose fat">Lose Fat</MenuItem>
                            <MenuItem value="maintain muscle">Maintain Muscle</MenuItem>
                            <MenuItem value="build muscle">Build Muscle</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth variant="standard" sx={{ mb: 2 }}>
                        <InputLabel>Training Method</InputLabel>
                        <Select
                            name="trainingMethod"
                            value={formValues.trainingMethod}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="resistance training">Resistance Training</MenuItem>
                            <MenuItem value="strength training">Strength Training</MenuItem>
                            <MenuItem value="resistance plus cardio">Resistance + Cardio</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="standard"
                        sx={{ mb: 2 }}
                    >
                        <InputLabel>Workout Type</InputLabel>
                        <Select
                            name="workoutType"
                            value={formValues.workoutType}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="weighted">Weighted</MenuItem>
                            <MenuItem value="bodyweight">Bodyweight</MenuItem>
                            <MenuItem value="no equipment">No Equipment</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl
                        fullWidth
                        variant="standard"
                        sx={{ mb: 2 }}
                    >
                        <InputLabel>Routine Focus</InputLabel>
                        <Select
                            name="routineFocus"
                            value={formValues.routineFocus}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="aesthetics">Aesthetics</MenuItem>
                            <MenuItem value="strength">Strength</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl
                        fullWidth
                        variant="standard"
                        sx={{ mb: 2 }}
                    >
                        <InputLabel>Strength Level</InputLabel>
                        <Select
                            name="strengthLevel"
                            value={formValues.strengthLevel}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="beginner">Beginner</MenuItem>
                            <MenuItem value="intermediate">Intermediate</MenuItem>
                            <MenuItem value="advanced">Advanced</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        name="trainingDays"
                        label="Training Days per Week"
                        value={formValues.trainingDays}
                        onChange={handleChange}
                        type="number"
                        required
                        fullWidth
                        variant="standard"
                        sx={{ mb: 2 }}
                    />

                    <FormControl
                        fullWidth
                        variant="standard"
                        sx={{ mb: 2 }}
                    >
                        <InputLabel>Workout Time</InputLabel>
                        <Select
                            name="workoutTime"
                            value={formValues.workoutTime}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="very limited">Very Limited</MenuItem>
                            <MenuItem value="30 mins">30 Mins</MenuItem>
                            <MenuItem value="45 mins">45 Mins</MenuItem>
                            <MenuItem value="60 mins">60 Mins</MenuItem>
                            <MenuItem value="75 mins">75 Mins</MenuItem>
                            <MenuItem value="90 mins">90 Mins</MenuItem>
                        </Select>
                    </FormControl>

                    <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                        Generate Workout
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    {workoutSuggestion && (
                        <Box
                            sx={{
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                p: 3,
                                mt: 4,
                                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
                                backgroundColor: '#f5f5f5',
                            }}
                        >
                            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                                Workout Plan:
                            </Typography>
                            <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                                {workoutSuggestion}
                            </Typography>
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default WorkoutSuggestion;

