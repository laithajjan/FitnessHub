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
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      padding: theme.spacing(2),
      textAlign: 'center',
      borderRadius: theme.spacing(1),
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    resultsSection: {
      marginTop: theme.spacing(3),
    },
    dietBox: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(2),
      borderRadius: theme.spacing(1),
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      marginBottom: theme.spacing(2),
    },
    dietTitle: {
      marginBottom: theme.spacing(1),
    },
  })
);

const MacroCalculator = () => {
  const classes = useStyles();

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
        <Card className={classes.card} elevation={0}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              Macro Calculator
            </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl className={classes.formControl} fullWidth>
              <TextField
                label="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="number"
                required
              />
            </FormControl>
            <FormControl className={classes.formControl} fullWidth>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                row
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
            <FormControl className={classes.formControl} fullWidth>
              <TextField
                label={`Height (${unit === 'metric' ? 'cm' : 'in'})`}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                type="number"
                required
              />
            </FormControl>
            <FormControl className={classes.formControl} fullWidth>
              <TextField
                label={`Weight (${unit === 'metric' ? 'kg' : 'lb'})`}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                type="number"
                required
              />
            </FormControl>
            <FormControl className={classes.formControl} fullWidth>
              <FormLabel>Unit</FormLabel>
              <RadioGroup
                row
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
            <FormControl className={classes.formControl} fullWidth>
              <FormLabel>Activity Level</FormLabel>
              <Select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
              >
                <MenuItem value="light">
                  Light: exercise 1-3 times a week
                </MenuItem>
                <MenuItem value="moderate">
                  Moderate: exercise 4-5 times a week
                </MenuItem>
                <MenuItem value="active">Active: daily exercise</MenuItem>
                <MenuItem value="very_active">
                  Very Active: intense activity 6-7 times a week
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl} fullWidth>
              <FormLabel>Goal</FormLabel>
              <Select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              >
                <MenuItem value="maintain">Maintain weight</MenuItem>
                <MenuItem value="mild_loss">
                  Mild weight loss (0.5 lb/0.25 kg per week)
                </MenuItem>
                <MenuItem value="loss">
                  Weight loss (1 lb/0.5 kg per week)
                </MenuItem>
                <MenuItem value="extreme_loss">
                  Extreme weight loss (2 lb/1 kg per week)
                </MenuItem>
                <MenuItem value="mild_gain">
                  Mild weight gain (0.5 lb/0.25 kg per week)
                </MenuItem>
                <MenuItem value="gain">
                  Weight gain (1 lb/0.5 kg per week)
                </MenuItem>
                <MenuItem value="extreme_gain">
                  Extreme weight gain (2 lb/1 kg per week)
                </MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" fullWidth color="primary">
              Calculate Macros
            </Button>
          </form>
          </CardContent>
          {results && (
            <Box className={classes.resultsSection}>
              <Typography variant="h5" align="center" gutterBottom>
                Results
              </Typography>
              {Object.entries(results).map(([diet, values]) => (
                <Card
                  key={diet}
                  className={classes.dietBox}
                  style={{
                    backgroundColor: dietColors[diet].background,
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      align="center"
                      className={classes.dietTitle}
                      style={{
                        color: dietColors[diet].text,
                      }}
                    >
                      {diet}
                    </Typography>
                    {Object.entries(values).map(([key, value]) => (
                      <Typography
                        key={key}
                        variant="body1"
                        align="center"
                        style={{
                          color: dietColors[diet].text,
                        }}
                      >
                        {key}: {value}
                      </Typography>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Card>
      </Grid>
    </Grid>
  );
};

export default MacroCalculator;