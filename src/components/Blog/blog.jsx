import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, Typography, Divider, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 64px - 56px)',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  header: {
    fontFamily: "'Roboto', sans-serif",
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: 500,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  subHeader: {
    fontFamily: "'Roboto', sans-serif",
    textAlign: 'center',
    fontSize: '1.5rem',
    fontWeight: 400,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

const FitnessBlog = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Paper className={classes.paper}>
          <Typography variant="h4" component="h1" className={classes.header}>
            Comprehensive Guide to a Healthier Lifestyle
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            An active lifestyle coupled with a balanced diet is the cornerstone of good health. This comprehensive guide delves into key aspects of a healthier lifestyle, providing insights on nutrition, exercise, and healthy habits.
          </Typography>
          <Divider variant="middle" className={classes.divider} />
          <Typography variant="h5" component="h2" className={classes.subHeader}>
            Healthy Habits for a Better Life
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Good habits are crucial for maintaining physical, mental, and emotional well-being. Here are some healthy habits to incorporate into your daily routine:
          </Typography>
          <ul>
            <li>Hydration: Aim to drink at least 2 liters of water per day. Hydration aids in digestion, absorption, circulation, creation of saliva, transportation of nutrients, and maintenance of body temperature.</li>
            <li>Healthy Eating: Consume a balanced diet with a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats to provide essential nutrients. The body needs these nutrients for reproduction, maintenance, growth, and regulation of bodily processes.</li>
            <li>Regular Exercise: Try to engage in at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous aerobic activity per week. Regular physical activity can improve your muscle strength and boost your endurance, delivering oxygen and nutrients to your tissues and helping your cardiovascular system work more efficiently.</li>
            <li>Quality Sleep: Endeavor to get between 7-9 hours of sleep each night. During sleep, your body works to support healthy brain function and maintain your physical health, playing a vital role in the healing and repair of your heart and blood vessels.</li>
            <li>Stress Management: Practice stress-reducing techniques like deep breathing, meditation, or yoga. Prolonged stress can lead to various health problems, including heart disease, high blood             pressure, diabetes, depression, anxiety disorder, and other illnesses.</li>
            <li>Maintain Social Connections: Having strong social connections can help you feel happier and more fulfilled, and can help to improve your mental and emotional well-being.</li>
            <li>Regular Check-ups: Regular health check-ups can help find problems before they start. They also can help find problems early, when your chances for treatment and cure are better.</li>
          </ul>
          <Divider variant="middle" className={classes.divider} />
          <Typography variant="h5" component="h2" className={classes.subHeader}>
            Essential Exercises for Optimal Fitness
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Regular exercise is key to maintaining health and fitness. Here are some fundamental exercises to include in your workout routine:
          </Typography>
          <ul>
            <li>Squats: Great for building lower body strength and power. It engages your core and entire lower body.</li>
            <li>Push-ups: Excellent for building upper body strength, especially your chest, shoulders and triceps. It's also great for your core and improving your balance and posture.</li>
            <li>Planks: This is a perfect exercise for building core strength and stability. It also works your glutes and hamstrings, supports proper posture, and improves balance.</li>
            <li>Deadlifts: An excellent exercise for building overall strength and power. Deadlifts are a compound exercise that work multiple muscle groups, including the back, legs, and core.</li>
            <li>Pull-ups: Ideal for building upper body strength, particularly your back, shoulders, and arms.</li>
            <li>Running or cycling: These are great cardio exercises for building endurance and improving heart health.</li>
          </ul>
          <Divider variant="middle" className={classes.divider} />
          <Typography variant="h5" component="h2" className={classes.subHeader}>
            Nutrition Tips for Optimal Health
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Proper nutrition is vital for supporting health and fitness. Here are some key tips to consider when planning your meals:
          </Typography>
          <ul>
            <li>Include a variety of fruits and vegetables in your diet. These are packed with essential vitamins and minerals that your body needs to function properly.</li>
            <li>Choose whole grains over refined grains. Whole grains are a good source of fiber and other important nutrients, such as B vitamins, iron, folate, selenium, potassium, and magnesium.</li>
            <li>Lean proteins are essential for building and repairing tissues. They also help you feel full and can prevent overeating. Good sources include chicken, fish, beans, and tofu.</li>
            <li>Limit your intake of saturated and trans fats, which can increase your risk of heart disease. Opt for healthy fats found in olive oil, avocados, and nuts.</li>
            <li>Reduce your intake of added sugars, which can lead to weight gain and other health problems. Instead, opt for natural sources of sweetness such as fresh fruit or a small amount of honey or maple syrup.</li>
            <li>Stay hydrated. Water is essential for your body's overall health, aiding in digestion, nutrient absorption, and more.</li>
            <li>Plan your meals and snacks in advance to ensure that you have healthy options readily available. This can help you avoid unhealthy choices when you're hungry or short on time.</li>
          </ul>
          <Divider variant="middle" className={classes.divider} />
          <Typography variant="h5" component="h2" className={classes.subHeader}>
            Mental Health and Wellness
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            A healthy lifestyle isn't complete without considering mental health and wellness. Here are some tips to keep your mind healthy and active:
          </Typography>
          <ul>
            <li>Meditation: Practicing mindfulness or meditation can help reduce stress and increase your overall happiness. Even a few minutes a day can make a big difference.</li>
            <li>Learning: Keep your mind active by continually learning new things. This could be as simple as reading a book, learning a new hobby, or even taking an online course.</li>
            <li>Positive Relationships: Maintain a strong social network. Positive relationships with family, friends, and colleagues are important for mental health.</li>
            <li>Time Management: Effective time management can reduce stress levels significantly. Prioritize tasks and work in a structured manner to avoid last-minute stress.</li>
          </ul>
          <Divider variant="middle" className={classes.divider} />
          <Typography variant="h5" component="h2" className={classes.subHeader}>
            Conclusion
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Leading a healthy lifestyle may seem challenging, but incorporating healthy habits, regular exercise, and proper nutrition into your routine can have a significant impact on your overall health and well-being. It might take some time and effort to establish these habits, but the long-term benefits are well worth it. Remember to consult with a healthcare professional before starting any new exercise or nutrition program, especially if you have any underlying health conditions or concerns.
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default FitnessBlog;


