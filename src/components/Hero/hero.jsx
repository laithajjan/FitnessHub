import React, { useRef } from 'react';
import BMI from "../../assets/3437750214_bmi calculator _xl-beta-v2-2-2.png"
import CIC from "../../assets/3916107758_Calorie Intake Calculator _xl-beta-v2-2-2.png"
import ORM from "../../assets/1584193756_One Rep Max Calculator _xl-beta-v2-2-2.png"
import HeroImage from "../../assets/risen-wang-20jX9b35r_M-unsplash.jpg"
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
        <div className={classes.cardContainer} ref={cardsRef}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={BMI}
                    title="Image 1"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.cardTitle}>
                        BMI Calculator
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.cardDescription}>
                        FitnessHub's BMI calculator measures a user's body mass index based on their height and weight to help them understand their current health status and take steps towards a healthier lifestyle.
                    </Typography>
                    <Button variant="contained" className={classes.cardButton}>
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
                        Calorie Intake Calculator
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.cardDescription}>
                        FitnessHub's calorie intake calculator helps users estimate the number of calories they need to consume daily based on their age, gender, weight, and activity level.
                    </Typography>
                    <Button variant="contained" className={classes.cardButton}>
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
                        One Rep Max Calculator
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.cardDescription}>
                        FitnessHub's one rep max calculator estimates the maximum weight a user can lift for a single repetition based on their previous lifts. This helps users track their progress and set achievable fitness goals.
                    </Typography>
                    <Button variant="contained" className={classes.cardButton}>
                        Learn More
                    </Button>
                </CardContent>
            </Card>
        </div>
    </>
    );

}

export default Hero;

