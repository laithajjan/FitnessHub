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
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h4">One Rep Max Calculator</Typography>
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
      <TextField
        label={`Weight Lifted (${unit})`}
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        type="number"
        required
      />
      <TextField
        label="Reps Performed"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        type="number"
        required
      />
      <Button type="submit" variant="contained">
        Calculate
      </Button>
      {maxWeight && (
        <>
          <Typography variant="h5">
            Estimated 1 Rep Max: {maxWeight.toFixed(1)} {unit}
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
        </>
      )}
    </Box>
  );
};

export default OneRepMaxCalculator;
