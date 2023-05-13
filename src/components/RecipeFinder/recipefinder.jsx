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
    makeStyles
} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
    },
    title: {
        fontWeight: "bold",
        fontSize: "3rem",
        marginBottom: theme.spacing(4),
        color: theme.palette.primary.main,
        textShadow: `2px 2px ${theme.palette.grey[500]}`,
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(4),
        backgroundColor: theme.palette.common.white,
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.grey[300]}`,
        boxShadow: theme.shadows[4],
    },
    searchInput: {
        width: "100%",
        marginBottom: theme.spacing(2),
        fontSize: "1.5rem",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.common.white,
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
    table: {
        fontSize: "1.2rem",
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
        <Container maxWidth="md" className={classes.container}>
            <Typography variant="h1" className={classes.title} align="center">
                Recipe Finder
            </Typography>
            <Paper className={classes.form} elevation={4}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        className={classes.searchInput}
                        label="Search for recipes"
                        variant="outlined"
                        size="medium"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <Button
                        className={classes.searchButton}
                        variant="contained"
                        color="primary"
                        type="submit"
                        size="large"
                    >
                        Search
                    </Button>

                </form>
            </Paper>
            {recipes.length > 0 && (
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table}>
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
            )}
        </Container>
    );
};

export default RecipeFinder;
 