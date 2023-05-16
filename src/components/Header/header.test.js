import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './header';

describe('Header', () => {
    test('renders the component', () => {
        render(
            <Router>
                <Header />
            </Router>
        );

        expect(screen.getByAltText('Logo')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Fitness')).toBeInTheDocument();
        expect(screen.getByText('Nutrition')).toBeInTheDocument();
        expect(screen.getByText('Health Calculators')).toBeInTheDocument();
        expect(screen.getByText('Blog')).toBeInTheDocument();
    });

    test('opens and closes submenus on button click', () => {
        render(
            <Router>
                <Header />
            </Router>
        );

        const fitnessButton = screen.getByRole('button', { name: 'Fitness' });
        const nutritionButton = screen.getByRole('button', { name: 'Nutrition' });
        const healthCalculatorsButton = screen.getByRole('button', { name: 'Health Calculators' });

        fireEvent.click(fitnessButton);
        expect(screen.getByRole('menu')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Workout Suggestions'));
        expect(window.location.href).toBe('/workout');

        fireEvent.click(fitnessButton);
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();

        fireEvent.click(nutritionButton);
        expect(screen.getByRole('menu')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Nutrition Analysis'));
        expect(window.location.href).toBe('/nutrition');

        fireEvent.click(nutritionButton);
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();

        fireEvent.click(healthCalculatorsButton);
        expect(screen.getByRole('menu')).toBeInTheDocument();

        fireEvent.click(screen.getByText('One Rep Max Calculator'));
        expect(window.location.href).toBe('/ORM');

        fireEvent.click(healthCalculatorsButton);
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
});
