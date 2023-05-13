import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

const BMICalculator = () => {
    const [heightCm, setHeightCm] = useState('');
    const [heightFt, setHeightFt] = useState('');
    const [heightIn, setHeightIn] = useState('');
    const [weightKg, setWeightKg] = useState('');
    const [weightLbs, setWeightLbs] = useState('');
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState('');
    const [unitSystem, setUnitSystem] = useState('metric');

    useEffect(() => {
        setHeightCm('');
        setHeightFt('');
        setHeightIn('');
        setWeightKg('');
        setWeightLbs('');
        setBmi(null);
        setCategory('');
    }, [unitSystem]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/bmi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ heightCm, heightFt, heightIn, weightKg, weightLbs, unitSystem }),
        });
        const data = await response.json();
        setBmi(data.bmi);
        setCategory(data.category);
    };

    return (
        <Box sx={{ paddingTop: 6, paddingBottom: 6 }}>
            <Container maxWidth="md">
                <Paper elevation={3} sx={{ p: 6, my: 6 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h4" align="center" gutterBottom sx={{ mb: 2 }}>
                                BMI Calculator
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl component="fieldset" sx={{ mb: 2 }}>
                                <RadioGroup
                                    row
                                    aria-label="unit system"
                                    name="unit-system"
                                    value={unitSystem}
                                    onChange={(e) => setUnitSystem(e.target.value)}
                                >
                                    <FormControlLabel value="metric" control={<Radio />} label="Metric (cm/kg)" />
                                    <FormControlLabel value="imperial" control={<Radio />} label="Imperial (ft/in/lbs)" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        {unitSystem === 'metric' && (
                            <>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Height (cm)"
                                        value={heightCm}
                                        onChange={(e) => setHeightCm(e.target.value)}
                                        type="number"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Weight (kg)"
                                        value={weightKg}
                                        onChange={(e) => setWeightKg(e.target.value)}
                                        type="number"
                                        required
                                    />
                                </Grid>
                            </>
                        )}
                        {unitSystem === 'imperial' && (
                            <>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        label="Height (ft)"
                                        value={heightFt}
                                        onChange={(e) => setHeightFt(e.target.value)}
                                        type="number"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        label="Height (in)"
                                        value={heightIn}
                                        onChange={(e) => setHeightIn(e.target.value)}
                                        type="number"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        label="Weight (lbs)"
                                        value={weightLbs}
                                        onChange={(e) => setWeightLbs(e.target.value)}
                                        type="number"
                                    />
                                </Grid>
                            </>
                        )}
                        <Grid item xs={12}>
                            <Button fullWidth type="submit" variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
                                Calculate BMI
                            </Button>
                        </Grid>
                    </Grid>
                    {bmi && (
                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h5" align="center" color="primary.main" sx={{ mb: 2 }}>
                                Your BMI: <span style={{ color: "#f50057", fontWeight: "bold" }}>{bmi.toFixed(1)}</span>
                            </Typography>
                            <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 2 }}>
                                Your BMI category: <span style={{ color: "#3f51b5", fontWeight: "bold" }}>{category}</span>
                            </Typography>
                        </Box>
                    )}
                </Paper>
            </Container>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                    Powered by BMICalculator.com
                </Typography>
            </Box>
        </Box>
    );
};

export default BMICalculator;
