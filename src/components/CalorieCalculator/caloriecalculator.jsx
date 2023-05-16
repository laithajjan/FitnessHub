import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';

const CalorieCalculator = () => {
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');
    const [heightIn, setHeightIn] = useState('');
    const [weight, setWeight] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [unit, setUnit] = useState('metric');
    const [calories, setCalories] = useState(null);

    const activityLevels = [
        { label: 'Light (exercise 1-3 times a week)', value: 'light' },
        { label: 'Moderate (exercise 4-5 times a week)', value: 'moderate' },
        { label: 'Active (daily exercise)', value: 'active' },
        { label: 'Very active (intense activity 6-7 times a week)', value: 'very_active' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/calorie', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ age, gender, height, heightIn, weight, activityLevel, unit }),
        });
        const data = await response.json();
        setCalories(data.calories);
    };

    const renderResults = () => {
        if (!calories) {
            return null;
        }

        const tableRows = [
            {
                label: 'Maintain weight',
                value: calories.maintenance,
                color: '#4caf50',
            },
            {
                label: 'Mild weight loss (0.25 kg/week)',
                value: calories.mild_loss,
                color: '#8bc34a',
            },
            {
                label: 'Weight loss (0.5 kg/week)',
                value: calories.loss,
                color: '#ffc107',
            },
            {
                label: 'Extreme weight loss (1 kg/week)',
                value: calories.extreme_loss,
                color: '#f44336',
            },
        ];

        return (
            <>
                <Typography variant="h6" mt={4} mb={2}>
                    Results:
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Goal</TableCell>
                                <TableCell align="right">Calories/Day</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableRows.map((row) => (
                                <TableRow key={row.label} style={{ backgroundColor: row.color }}>
                                    <TableCell component="th" scope="row" style={{ color: '#fff' }}>
                                        {row.label}
                                    </TableCell>
                                    <TableCell align="right" style={{ color: '#fff' }}>
                                        {row.value}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    };


    const renderMetricForm = () => (
        <>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    type="number"
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                        labelId="gender-label"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Height (cm)"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    type="number"
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Weight (kg)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    type="number"
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="activity-level-label">Activity Level</InputLabel>
                    <Select
                        labelId="activity-level-label"
                        value={activityLevel}
                        onChange={(e) => setActivityLevel(e.target.value)}
                        required
                    >
                        {activityLevels.map((level) => (
                            <MenuItem key={level.value} value={level.value}>
                                {level.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </>
    );
    const renderImperialForm = () => (
        <>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    type="number"
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                        labelId="gender-label"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="Height (ft)"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    type="number"
                    required
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="Height (in)"
                    value={heightIn}
                    onChange={(e) => setHeightIn(e.target.value)}
                    type="number"
                    required
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="Weight (lbs)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    type="number"
                    required
                />
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel id="activity-level-label">Activity Level</InputLabel>
                    <Select
                        labelId="activity-level-label"
                        value={activityLevel}
                        onChange={(e) => setActivityLevel(e.target.value)}
                        required
                    >
                        {activityLevels.map((level) => (
                            <MenuItem key={level.value}
                                value={level.value}
                            >
                                {level.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </>); return (
            <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Typography variant="h4" align="center" mb={2}>
                            Calorie Intake Calculator
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Unit</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-label="unit"
                                        name="unit"
                                        value={unit}
                                        onChange={(e) => setUnit(e.target.value)}
                                    >
                                        <FormControlLabel
                                            value="metric"
                                            control={<Radio />}
                                            label="Metric"
                                        />
                                        <FormControlLabel
                                            value="imperial"
                                            control={<Radio />}
                                            label="Imperial"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            {unit === 'metric' ? renderMetricForm() : renderImperialForm()}
                            <Grid item xs={12}>
                                <Button fullWidth type="submit" variant="contained">
                                    Calculate Calories
                                </Button>
                            </Grid>
                        </Grid>
                        {renderResults()}
                    </Box>
                </Paper>
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                    Powered by FitnessHub
                </Typography>
            </Box>
            </Container>
        );
};

export default CalorieCalculator;
