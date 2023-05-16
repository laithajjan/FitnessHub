import React, { useRef } from 'react';
import BMI from "../../assets/3437750214_bmi calculator _xl-beta-v2-2-2.png"
import CIC from "../../assets/3916107758_Calorie Intake Calculator _xl-beta-v2-2-2.png"
import ORM from "../../assets/1584193756_One Rep Max Calculator _xl-beta-v2-2-2.png"
import HeroImage from "../../assets/risen-wang-20jX9b35r_M-unsplash.jpg"
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Card, CardMedia, CardContent } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    heroContainer: {
        backgroundImage: `linear-gradient(135deg, rgba(245, 245, 245, 0.8), rgba(224, 224, 224, 0.8)), url(${HeroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '100px 0',
        textAlign: 'center',
    },
    heroTitle: {
        fontSize: '3.5rem',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '24px',
    },
    heroSubtitle: {
        fontSize: '1.5rem',
        color: '#555',
        marginBottom: '48px',
    },
    heroButton: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#1e88e5',
        padding: '16px 48px',
        borderRadius: '50px',
        textTransform: 'none',
        boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
        transition: 'background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
            backgroundColor: '#1565c0',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        },
    },
    cardContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '48px',
        flexWrap: 'wrap',
    },
    card: {
        maxWidth: 345,
        margin: '0 16px',
        marginBottom: '32px',
        height: '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    cardMedia: {
        height: 140,
    },
    cardTitle: {
        fontSize: '1.7rem',
        fontWeight: 'bold',
        color: '#333',
        margin: '16px 0',
    },
    cardDescription: {
        fontSize: '18px',
        color: '#555',
        marginBottom: '16px',
        minHeight: '96px',
        maxHeight: '200px'
    },
    exploreNowHeader: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '24px',
        marginTop: '48px',
        padding: '16px 0',
    },
    cardButton: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#1e88e5',
        padding: '12px 24px',
        borderRadius: '50px',
        textTransform: 'none',
        boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
        transition: 'background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
            backgroundColor: '#1565c0',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        },
    },
}));

function Hero() {
    const classes = useStyles();
    const cardsRef = useRef(null);

    const scrollToCards = () => {
        if (cardsRef.current) {
            cardsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (<>
        <div className={classes.heroContainer}>
            <Typography variant="h1" className={classes.heroTitle}>
                FitnessHub
            </Typography>
            <Typography variant="h3" className={classes.heroSubtitle}>
                Transform Your Body, Transform Your Life
            </Typography>
            <Button variant="contained" className={classes.heroButton} onClick={scrollToCards}>
                Get started
            </Button>
        </div>
        <Typography variant="h2" align="center" className={classes.exploreNowHeader}>
            Explore Now
        </Typography>
        <div className={classes.cardContainer} ref={cardsRef}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={BMI}
                    title="Image 1"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.cardTitle}>
                        Macronutrient Calculator
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.cardDescription}>
                        Boost your nutrition using FitnessHub's Macronutrient Calculator. Enter age, height, weight, activity level, and goal for a tailored macronutrient plan. Efficiently fuel your body and attain your objectives with personalized recommendations.
                    </Typography>
                    <Button variant="contained" className={classes.cardButton} component={Link} to="/macro">
                        Learn More
                    </Button>
                </CardContent>
            </Card>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={CIC}
                    title="Image 2"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.cardTitle}>
                        Nutrition Analysis
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.cardDescription}>
                        Discover the power of informed eating with FitnessHub's Nutrition Analysis Page. Input your food and quantity, like 200 grams of chicken, to promptly access detailed nutrition facts. Make smarter choices and enhance your diet effortlessly.                    </Typography>
                    <Button variant="contained" className={classes.cardButton} component={Link} to="/nutrition">
                        Learn More
                    </Button>
                </CardContent>
            </Card>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={ORM}
                    title="Image 3"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.cardTitle}>
                        Workout Suggestions
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.cardDescription}>
                        Improve your fitness through FitnessHub's Workout Suggestion Page. Provide preferences, such as gender, goals, and training method, to obtain a custom workout plan. Revamp your routine and reach results more effectively with individualized advice.
                    </Typography>
                    <Button variant="contained" className={classes.cardButton} component={Link} to="/workout">
                        Learn More
                    </Button>
                </CardContent>
            </Card>
        </div>
    </>
    );

}

export default Hero;

