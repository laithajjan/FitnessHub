import { render, screen } from '@testing-library/react';
import FitnessBlog from './FitnessBlog';

describe('FitnessBlog', () => {
  beforeEach(() => {
    render(<FitnessBlog />);
  });

  test('renders blog correctly', () => {
    const mainHeader = screen.getByText(/Healthy Habits for a Better Life/i);
    expect(mainHeader).toBeInTheDocument();
  });

  test('renders healthy habits section correctly', () => {
    const healthyHabitsHeader = screen.getByText(/Healthy Habits for a Better Life/i);
    expect(healthyHabitsHeader).toBeInTheDocument();

    const healthyHabitsText = screen.getByText(/In order to maintain a healthy lifestyle/i);
    expect(healthyHabitsText).toBeInTheDocument();
  });

  test('renders exercises section correctly', () => {
    const exercisesHeader = screen.getByText(/Crucial Exercises for Optimal Fitness/i);
    expect(exercisesHeader).toBeInTheDocument();

    const exercisesText = screen.getByText(/Regular exercise is essential for maintaining good health/i);
    expect(exercisesText).toBeInTheDocument();
  });

  test('renders nutrition section correctly', () => {
    const nutritionHeader = screen.getByText(/Nutrition Tips for Optimal Health/i);
    expect(nutritionHeader).toBeInTheDocument();

    const nutritionText = screen.getByText(/Proper nutrition is essential for supporting good health/i);
    expect(nutritionText).toBeInTheDocument();
  });

  test('renders mental health section correctly', () => {
    const mentalHealthHeader = screen.getByText(/Mental Health and Wellness/i);
    expect(mentalHealthHeader).toBeInTheDocument();

    const mentalHealthText = screen.getByText(/A healthy lifestyle isn't complete without considering mental health/i);
    expect(mentalHealthText).toBeInTheDocument();
  });

  test('renders conclusion section correctly', () => {
    const conclusionHeader = screen.getByText(/Conclusion/i);
    expect(conclusionHeader).toBeInTheDocument();

    const conclusionText = screen.getByText(/Leading a healthy lifestyle may seem challenging/i);
    expect(conclusionText).toBeInTheDocument();
  });
});
