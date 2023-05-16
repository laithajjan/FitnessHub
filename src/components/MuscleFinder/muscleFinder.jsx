import React, { useState } from 'react';
import {
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    TextField,
    Button,
    Collapse,
    Grid,
    Box,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    container: {
        margin: theme.spacing(4),
        borderRadius: '10px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        padding: theme.spacing(4),
    },
    title: {
        marginBottom: theme.spacing(4),
        textAlign: 'center',
    },
    searchForm: {
        marginTop: theme.spacing(20),
        marginBottom: theme.spacing(20),
    },
    searchField: {
        marginBottom: theme.spacing(2),
    },
    instructions: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    tableHeader: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
    },
    tableRow: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}));

const ExerciseTable = () => {
    const classes = useStyles();
    const [muscle, setMuscle] = useState('');
    const [exercises, setExercises] = useState([]);
    const [openInstructions, setOpenInstructions] = useState([]);
    const API_KEY = process.env.REACT_APP_MUSCLE_FINDER_API_KEY;


    const fetchExercises = async () => {
        const response = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
            headers: {
                'X-Api-Key': API_KEY,
            },
        });
        const data = await response.json();
        setExercises(data);
        setOpenInstructions(new Array(data.length).fill(false));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchExercises();
    };

    const handleToggleInstructions = (index) => {
        const newOpenInstructions = openInstructions.slice();
        newOpenInstructions[index] = !newOpenInstructions[index];
        setOpenInstructions(newOpenInstructions);
    };

    return (
        <Box className={classes.container}>
            <Typography variant="h4" className={classes.title}>
                Search Exercises
            </Typography>
            <Typography variant="h6" color="textSecondary" align="center" gutterBottom>
                Discover tailored exercises by specifying your target muscle group. Unleash your potential now!
            </Typography>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <form className={classes.searchForm} onSubmit={handleSubmit}>
                        <TextField
                            label="Muscle"
                            variant="outlined"
                            fullWidth
                            className={classes.searchField}
                            value={muscle}
                            onChange={(e) => setMuscle(e.target.value)}
                        />
                        <Button variant="contained" color="primary" fullWidth type="submit">
                            Search
                        </Button>
                    </form>
                </Grid>
            </Grid>
            {exercises.length > 0 && (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="exercises table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableHeader}>Name</TableCell>
                                <TableCell className={classes.tableHeader}>Type</TableCell>
                                <TableCell className={classes.tableHeader}>Muscle</TableCell>
                                <TableCell className={classes.tableHeader}>Equipment</TableCell>
                                <TableCell className={classes.tableHeader}>Difficulty</TableCell>
                                <TableCell className={classes.tableHeader}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {exercises.map((exercise, index) => (
                                <React.Fragment key={exercise.name}>
                                    <TableRow className={classes.tableRow}>
                                        <TableCell component="th" scope="row">
                                            {exercise.name}
                                        </TableCell>
                                        <TableCell>{exercise.type}</TableCell>
                                        <TableCell>{exercise.muscle}</TableCell>
                                        <TableCell>{exercise.equipment}</TableCell>
                                        <TableCell>{exercise.difficulty}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleToggleInstructions(index)}
                                            >
                                                {openInstructions[index] ? 'Hide Instructions' : 'Show Instructions'}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell
                                            className={classes.instructions}
                                            colSpan={6}
                                            style={{ paddingBottom: 0, paddingTop: 0 }}
                                        >
                                            <Collapse in={openInstructions[index]} timeout="auto" unmountOnExit>
                                                <Typography variant="body2" component="div">
                                                    {exercise.instructions}
                                                </Typography>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default ExerciseTable;

