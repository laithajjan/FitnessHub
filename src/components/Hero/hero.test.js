import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Hero from './hero';

describe('Hero', () => {
    test('renders the component', () => {
        render(
            <Router>
                <Hero />
            </Router>
        );

        expect(screen.getByText('FitnessHub')).toBeInTheDocument();
        expect(screen.getByText('Transform Your Body, Transform Your Life')).toBeInTheDocument();
        expect(screen.getByText('Get started')).toBeInTheDocument();
        expect(screen.getByText('Explore Now')).toBeInTheDocument();
        expect(screen.getByText('Macronutrient Calculator')).toBeInTheDocument();
        expect(screen.getByText('Nutrition Analysis')).toBeInTheDocument();
        expect(screen.getByText('Workout Suggestions')).toBeInTheDocument();
    });

    test('scrolls to cards section when button is clicked', () => {
        render(
            <Router>
                <Hero />
            </Router>
        );

        const button = screen.getByRole('button', { name: 'Get started' });
        const cardsSection = screen.getByText('Explore Now');

        fireEvent.click(button);

        expect(cardsSection).toBeInTheDocument();
        expect(window.scrollTo).toHaveBeenCalledWith({
            top: cardsSection.offsetTop,
            behavior: 'smooth',
        });
    });

    test('navigates to the respective routes when "Learn More" buttons are clicked', () => {
        render(
            <Router>
                <Hero />
            </Router>
        );

        const macroButton = screen.getByRole('button', { name: 'Learn More', text: 'Macronutrient Calculator' });
        const nutritionButton = screen.getByRole('button', { name: 'Learn More', text: 'Nutrition Analysis' });
        const workoutButton = screen.getByRole('button', { name: 'Learn More', text: 'Workout Suggestions' });

        fireEvent.click(macroButton);
        fireEvent.click(nutritionButton);
        fireEvent.click(workoutButton);

        expect(screen.getByText('Macronutrient Calculator Page')).toBeInTheDocument();
        expect(screen.getByText('Nutrition Analysis Page')).toBeInTheDocument();
        expect(screen.getByText('Workout Suggestions Page')).toBeInTheDocument();
    });
});
