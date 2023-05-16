import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  padding: theme.spacing(2),
  textAlign: 'center',
  borderRadius: theme.spacing(1),
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 120,
  width: '100%',
}));

const ResultsSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const DietBox = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  marginBottom: theme.spacing(2),
}));

const DietTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const PoweredBy = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
  textAlign: 'center',
}));

const MacroCalculator = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('metric');
  const [activityLevel, setActivityLevel] = useState('light');
  const [goal, setGoal] = useState('maintain');
  const [results, setResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/macro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        age,
        gender,
        height,
        weight,
        activityLevel,
        goal,
        unit,
      }),
    });

    const data = await response.json();
    setResults(data);
  };

  const dietColors = {
    'Balanced': {
      background: '#FFA726',
      text: 'white',
    },
    'Low Fat': {
      background: '#66BB6A',
      text: 'white',
    },
    'Low Carb': {
      background: '#42A5F5',
      text: 'white',
    },
    'High Protein': {
      background: '#AB47BC',
      text: 'white',
    },
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <StyledCard elevation={0}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              Macro Calculator
            </Typography>
            <form onSubmit={handleSubmit}>
              <StyledFormControl>
                <TextField
                  label="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  type="number"
                  required
                />
              </StyledFormControl>
              <StyledFormControl>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>
              </StyledFormControl>
              <StyledFormControl>
                <TextField
                  label="Height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  type="number"
                  required
                />
              </StyledFormControl>
              <StyledFormControl>
                <TextField
                  label="Weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  type="number"
                  required
                />
              </StyledFormControl>
              <StyledFormControl>
                <FormLabel>Unit</FormLabel>
                <Select value={unit} onChange={(e) => setUnit(e.target.value)}>
                  <MenuItem value="metric">Metric (cm, kg)</MenuItem>
                  <MenuItem value="imperial">Imperial (inches, lbs)</MenuItem>
                </Select>
              </StyledFormControl>
              <StyledFormControl>
                <FormLabel>Activity Level</FormLabel>
                <Select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="moderate">Moderate</MenuItem>
                  <MenuItem value="heavy">Heavy</MenuItem>
                </Select>
              </StyledFormControl>
              <StyledFormControl>
                <FormLabel>Goal</FormLabel>
                <Select value={goal} onChange={(e) => setGoal(e.target.value)}>
                  <MenuItem value="lose">Lose Weight</MenuItem>
                  <MenuItem value="maintain">Maintain Weight</MenuItem>
                  <MenuItem value="gain">Gain Weight</MenuItem>
                </Select>
              </StyledFormControl>
              <Button type="submit" color="primary" variant="contained">
                Calculate
              </Button>
            </form>
          </CardContent>
        </StyledCard>
        {results && (
          <ResultsSection>
            <Typography variant="h4" align="center" gutterBottom>
              Your Results
            </Typography>
            {Object.keys(results).map((diet) => (
              <DietBox key={diet} style={{ backgroundColor: dietColors[diet].background }}>
                <DietTitle variant="h5" style={{ color: dietColors[diet].text }}>
                  {diet}
                </DietTitle>
                {Object.keys(results[diet]).map((macro) => (
                  <Typography key={macro} style={{ color: dietColors[diet].text }}>
                    {macro}: {results[diet][macro]}g
                  </Typography>
                ))}
              </DietBox>
            ))}
          </ResultsSection>
        )}
        <PoweredBy variant="h6">
          Powered by FitnessHub
        </PoweredBy>
      </Grid>
    </Grid>
  );
};

export default MacroCalculator;


