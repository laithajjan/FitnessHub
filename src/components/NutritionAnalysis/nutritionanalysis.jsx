import React, { useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';

const NutritionAnalysis = () => {
    const [query, setQuery] = useState('');
    const [nutritionData, setNutritionData] = useState(null);
    const API_KEY = process.env.REACT_APP_NUTRITION_API_KEY;

    const fetchNutritionData = async () => {
        try {
            const response = await axios.get(
                `https://api.calorieninjas.com/v1/nutrition?query=${query}`,
                {
                    headers: {
                        'X-Api-Key': API_KEY,
                    },
                }
            );
            setNutritionData(response.data.items);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const sumNutritionData = (key) =>
        parseFloat(
            nutritionData
                ?.reduce((sum, item) => sum + item[key], 0)
                .toFixed(2)
        ) || 0;

    return (
        <Container maxWidth="sm">
            <Box my={12}>
                <Card sx={{ minHeight: '500px' }}>
                    <CardContent>
                        <Box textAlign="center">
                            <Typography variant="h4" component="h1" gutterBottom>
                                Nutrition Analysis
                            </Typography>
                            <Typography variant="h6" color="textSecondary" align="center" gutterBottom>
                                Discover nutrition facts for your favorite foods, for example, type "200 grams of chicken" to get nutritional information!
                            </Typography>
                            <TextField
                                label="Enter query"
                                variant="outlined"
                                fullWidth
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <Box mt={2}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={fetchNutritionData}
                                >
                                    Analyze
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            {nutritionData && (
                <Box my={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        sx={{
                                            fontWeight: 'bold',
                                            backgroundColor: (theme) =>
                                                theme.palette.primary.main,
                                            color: 'white',
                                        }}
                                    >
                                        Nutrient
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            fontWeight: 'bold',
                                            backgroundColor: (theme) =>
                                                theme.palette.primary.main,
                                            color: 'white',
                                        }}
                                    >
                                        Value
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Total Calories
                                    </TableCell>
                                    <TableCell align="center">
                                        {sumNutritionData('calories')} kcal
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Total Fat
                                    </TableCell>
                                    <TableCell align="center">
                                        {sumNutritionData('fat_total_g')} g
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Total Protein
                                    </TableCell>
                                    <TableCell align="center">
                                        {sumNutritionData('protein_g')} g
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Total Sodium
                                    </TableCell>
                                    <TableCell align="center">

                                        {sumNutritionData('sodium_mg')} mg
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Total Potassium
                                    </TableCell>
                                    <TableCell align="center">
                                        {sumNutritionData('potassium_mg')} mg
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Total Carbohydrates
                                    </TableCell>
                                    <TableCell align="center">
                                        {sumNutritionData('carbohydrates_total_g')} g
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Total Fiber
                                    </TableCell>
                                    <TableCell align="center">
                                        {sumNutritionData('fiber_g')} g
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Total Sugar
                                    </TableCell>
                                    <TableCell align="center">
                                        {sumNutritionData('sugar_g')} g
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                    Powered by FitnessHub
                </Typography>
            </Box>
        </Container>
        
    );
};

export default NutritionAnalysis;
