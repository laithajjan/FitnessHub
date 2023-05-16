import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Grid,
    makeStyles
} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10),
        minHeight: "100vh",
    },
    title: {
        fontWeight: "bold",
        fontSize: "3rem",
        marginBottom: theme.spacing(4),
    },
    subtitle: {
        fontSize: '1.2rem',
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(4),
        fontStyle: 'italic',
        fontWeight: 500,
    },
    paper: {
        padding: theme.spacing(4),
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.grey[300]}`,
        boxShadow: theme.shadows[4],
    },
    searchInput: {
        marginBottom: theme.spacing(2),
        fontSize: "1.5rem",
    },
    searchButton: {
        width: "100%",
        fontSize: "1.5rem",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4),
        textTransform: "none",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    tableContainer: {
        marginTop: theme.spacing(4),
        backgroundColor: theme.palette.common.white,
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.grey[300]}`,
        boxShadow: theme.shadows[4],
    },
    tableHeadCell: {
        fontWeight: "bold",
        fontSize: "1.4rem",
        color: theme.palette.primary.main,
    },
    tableCell: {
        fontSize: "1.2rem",
        lineHeight: 1.5,
    },
}));

const RecipeFinder = () => {
    const classes = useStyles();
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.get(`http://localhost:5000/recipe?query=${query}`);
            setRecipes(response.data);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    return (
        <Box className={classes.container}>
            <Container maxWidth="md">
                <Paper className={classes.paper} elevation={3}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h4" align="center" className={classes.title}>
                                Recipe Finder
                            </Typography>
                            <Typography variant="h6" align="center" className={classes.subtitle}>
                                Enter your favorite dish and get suggested recipes as well as instructions
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    className={classes.searchInput}
                                    label="Search for recipes"
                                    variant="outlined"
                                    size="medium"
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                    fullWidth
                                    required
                                />
                                <Button
                                    className={classes.searchButton}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    size="large"
                                    fullWidth
                                >
                                    Search
                                </Button>
                            </form>
                        </Grid>
                        {recipes.length > 0 && (
                            <Grid item xs={12}>
                                <TableContainer component={Paper} className={classes.tableContainer}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className={classes.tableHeadCell}>Title</TableCell>
                                                <TableCell className={classes.tableHeadCell}>Ingredients</TableCell>
                                                <TableCell className={classes.tableHeadCell}>Servings</TableCell>
                                                <TableCell className={classes.tableHeadCell}>Instructions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {recipes.map((recipe, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className={classes.tableCell} component="th" scope="row">
                                                        {recipe.title}
                                                    </TableCell>
                                                    <TableCell className={classes.tableCell}>{recipe.ingredients.replace(/\|/g, ', ')}</TableCell>
                                                    <TableCell className={classes.tableCell}>{recipe.servings}</TableCell>
                                                    <TableCell className={classes.tableCell}>{recipe.instructions}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        )}
                    </Grid>
                </Paper>
            </Container>
            <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}>
                <Typography variant="h6" color="text.secondary" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '1.2rem', textAlign: 'center' }}>
                    Powered by BMICalculator.com
                </Typography>
            </Box>
        </Box>
    );
};

export default RecipeFinder;

