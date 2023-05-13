import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Container,
  Grid,
  Paper,
} from '@mui/material';

const OneRepMaxCalculator = () => {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [unit, setUnit] = useState('');
  const [maxWeight, setMaxWeight] = useState(null);
  const [liftingPercentages, setLiftingPercentages] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/onerepmax', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ weight, reps, unit }),
      });

      if (response.ok) {
        const { oneRepMax, percentages } = await response.json();
        setMaxWeight(parseFloat(oneRepMax));
        setLiftingPercentages(percentages);
      } else {
        throw new Error('Error fetching data from server');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ paddingTop: 6, paddingBottom: 6 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 6, my: 6 }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h4" align="center" gutterBottom sx={{ mb: 2 }}>
                One Rep Max Calculator
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Unit</FormLabel>
                <RadioGroup
                  row
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                >
                  <FormControlLabel value="kg" control={<Radio />} label="kg" />
                  <FormControlLabel value="lbs" control={<Radio />} label="lbs" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={`Weight Lifted (${unit})`}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Reps Performed"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth type="submit" variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
                Calculate
              </Button>
            </Grid>
          </Grid>
          {maxWeight && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" align="center" color="primary.main" sx={{ mb: 2 }}>
                Estimated 1 Rep Max: <span style={{ color: "#f50057", fontWeight: "bold" }}>{maxWeight.toFixed(1)}</span> {unit}
              </Typography>
              {liftingPercentages && (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Percentage</TableCell>
                      <TableCell>Weight</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {liftingPercentages.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.percentage}%</TableCell>
                        <TableCell>{row.weight.toFixed(1)} {unit}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Box>
          )}
        </Paper>
      </Container>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Powered by OneRepMaxCalculator.com
        </Typography>
      </Box>
    </Box>
  );
};

export default OneRepMaxCalculator;
