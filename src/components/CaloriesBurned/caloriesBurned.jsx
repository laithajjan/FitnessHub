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

const CaloriesBurned = () => {
    const classes = useStyles();
    const [activity, setActivity] = useState('');
    const [activities, setActivities] = useState([]);
    const API_KEY = process.env.REACT_APP_MUSCLE_FINDER_API_KEY;

    const fetchActivities = async () => {
        const response = await fetch(`https://api.api-ninjas.com/v1/caloriesburned?activity=${activity}`, {
            headers: {
                'X-Api-Key': API_KEY,
            },
        });
        const data = await response.json();
        setActivities(data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchActivities();
    };

    return (
        <Box className={classes.container}>
            <Typography variant="h4" className={classes.title}>
                Search Calories Burned
            </Typography>
            <Typography variant="h6" color="textSecondary" align="center" gutterBottom>
                Discover how much calories you can burn by specifying your preferred activity. Start your fitness journey now! Example prompt "skiing"
            </Typography>
            <form className={classes.searchForm} onSubmit={handleSubmit}>
                <TextField
                    label="Activity"
                    variant="outlined"
                    fullWidth
                    className={classes.searchField}
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                />
                <Button variant="contained" color="primary" fullWidth type="submit">
                    Search
                </Button>
            </form>
            {activities.length > 0 && (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="calories burned table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableHeader}>Activity</TableCell>
                                <TableCell className={classes.tableHeader}>Calories per Hour</TableCell>
                                <TableCell className={classes.tableHeader}>Duration (minutes)</TableCell>
                                <TableCell className={classes.tableHeader}>Total Calories</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {activities.map((activity) => (
                                <TableRow key={activity.name} className={classes.tableRow}>
                                    <TableCell component="th" scope="row">
                                        {activity.name}
                                    </TableCell>
                                    <TableCell>{activity.calories_per_hour}</TableCell>
                                    <TableCell>{activity.duration_minutes}</TableCell>
                                    <TableCell>{activity.total_calories}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                    Powered by FitnessHub
                </Typography>
            </Box>
        </Box>
    );
};

export default CaloriesBurned;
