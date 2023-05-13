import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 64px - 56px)', // subtract header and footer height
  },
  paper: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
}));

const FitnessBlog = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Paper className={classes.paper}>
          <Typography variant="h4" component="h1" gutterBottom>
            Healthy Habits for a Better Life
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            In order to maintain a healthy lifestyle, it's important to establish good habits that support your physical, mental, and emotional well-being. Here are some healthy habits to consider incorporating into your daily routine:
          </Typography>
          <ul>
            <li>Drink plenty of water to stay hydrated throughout the day.</li>
            <li>Eat a balanced diet that includes a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats to provide your body with the necessary nutrients.</li>
            <li>Get enough sleep each night (7-9 hours) to support your body's recovery and repair processes, improve memory and focus, and boost overall well-being.</li>
            <li>Exercise regularly to build strength, endurance, and flexibility. Aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous aerobic activity per week.</li>
            <li>Maintain social connections with friends, family, and loved ones to support your mental health and emotional well-being. </li>
            <li>Practice stress-reduction techniques such as deep breathing, meditation, or yoga to reduce the negative impact of stress on your body and mind.</li>
          </ul>
          <Typography variant="h5" component="h2" gutterBottom>
            Crucial Exercises for Optimal Fitness
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Regular exercise is essential for maintaining good health and fitness. Here are some crucial exercises to consider incorporating into your workout routine:
          </Typography>
          <ul>
            <li>Squats for building lower body strength and power. Start with bodyweight squats, then progress to weighted squats as you get stronger.</li>
            <li>Push-ups for building upper body strength and endurance. If you can't do a full push-up, start with modified push-ups on your knees or against a wall, and work your way up to a full push-up.</li>
            <li>Planks for building core strength and stability. Start with a basic plank and gradually increase the duration and difficulty.</li>
            <li>Deadlifts for building overall strength and power. Deadlifts are a compound exercise that work multiple muscle groups, including the back, legs, and core.</li>
            <li>Pull-ups for building upper body strength and endurance. If you can't do a full pull-up, start with assisted pull-ups using a resistance band or machine, and work your way up to a full pull-up.</li>
            <li>Running or cycling for building cardiovascular endurance and fitness. Aim for at least 30 minutes of moderate-intensity exercise or 15 minutes of vigorous-intensity exercise per day.</li>
          </ul>
          <Typography variant="h5" component="h2" gutterBottom>
            Nutrition Tips for Optimal Health
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Proper nutrition is essential for supporting good health and fitness. Here are some nutrition tips to consider when planning your meals:
          </Typography>
          <ul>
            <li>Eat a variety of fruits and vegetables, as they are rich in vitamins, minerals, and fiber that are essential for good health.</li>
            <li>Choose whole grains over refined grains, as they are more nutrient-dense and provide sustained energy.</li>
            <li>Incorporate lean proteins such as chicken, fish, beans, and tofu into your meals to support muscle growth and repair.</li>
            <li>Limit your intake of saturated and trans fats, which can increase your risk of heart disease. Choose healthier fats such as olive oil, avocados, and nuts.</li>
            <li>Reduce your intake of added sugars, which can contribute to obesity, type 2 diabetes, and other health problems. Opt for natural sources of sweetness such as fresh fruit or a small amount of honey or maple syrup.</li>
            <li>Stay hydrated by drinking plenty of water throughout the day. Aim for at least 8 glasses of water per day, or more if you are physically active or in hot weather.</li>
            <li>Plan your meals and snacks ahead of time to ensure that you have healthy options readily available, and avoid skipping meals or relying on convenience foods.</li>
          </ul>
          <Typography variant="h5" component="h2" gutterBottom>
            Conclusion
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Incorporating healthy habits, regular exercise, and proper nutrition into your daily routine can have a profound impact on your overall health and well-being. It may take some time and effort to establish these habits, but the benefits are well worth it. Remember to consult with a healthcare professional before starting any new exercise or nutrition program, especially if you have any underlying health conditions or concerns.
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default FitnessBlog;
