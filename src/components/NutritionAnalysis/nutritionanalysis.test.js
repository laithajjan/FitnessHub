import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import NutritionAnalysis from './nutritionanalysis';

jest.mock('axios');

describe('NutritionAnalysis', () => {
    test('renders the component', () => {
        render(<NutritionAnalysis />);
        expect(screen.getByText('Nutrition Analysis')).toBeInTheDocument();
    });

    test('fetches and displays nutrition data', async () => {
        const mockResponse = {
            data: {
                items: [
                    {
                        calories: 100,
                        fat_total_g: 5,
                        protein_g: 10,
                        sodium_mg: 200,
                        potassium_mg: 300,
                        carbohydrates_total_g: 15,
                        fiber_g: 2,
                        sugar_g: 8,
                    },
                ],
            },
        };

        axios.get.mockResolvedValueOnce(mockResponse);

        render(<NutritionAnalysis />);

        const queryInput = screen.getByLabelText('Enter query');
        const analyzeButton = screen.getByRole('button', { name: 'Analyze' });

        fireEvent.change(queryInput, { target: { value: '200 grams of chicken' } });
        fireEvent.click(analyzeButton);

        expect(axios.get).toHaveBeenCalledWith(
            'https://api.calorieninjas.com/v1/nutrition?query=200%20grams%20of%20chicken',
            expect.any(Object)
        );

        await screen.findByText('Total Calories');

        expect(screen.getByText('Total Calories')).toBeInTheDocument();
        expect(screen.getByText('100 kcal')).toBeInTheDocument();
        expect(screen.getByText('Total Fat')).toBeInTheDocument();
        expect(screen.getByText('5 g')).toBeInTheDocument();
        expect(screen.getByText('Total Protein')).toBeInTheDocument();
        expect(screen.getByText('10 g')).toBeInTheDocument();
        expect(screen.getByText('Total Sodium')).toBeInTheDocument();
        expect(screen.getByText('200 mg')).toBeInTheDocument();
        expect(screen.getByText('Total Potassium')).toBeInTheDocument();
        expect(screen.getByText('300 mg')).toBeInTheDocument();
        expect(screen.getByText('Total Carbohydrates')).toBeInTheDocument();
        expect(screen.getByText('15 g')).toBeInTheDocument();
        expect(screen.getByText('Total Fiber')).toBeInTheDocument();
        expect(screen.getByText('2 g')).toBeInTheDocument();
        expect(screen.getByText('Total Sugar')).toBeInTheDocument();
        expect(screen.getByText('8 g')).toBeInTheDocument();
    });

    test('handles error when fetching nutrition data', async () => {
        const mockError = new Error('API error');

        axios.get.mockRejectedValueOnce(mockError);

        render(<NutritionAnalysis />);

        const queryInput = screen.getByLabelText('Enter query');
        const analyzeButton = screen.getByRole('button', { name: 'Analyze' });

        fireEvent.change(queryInput, { target: { value: '200 grams of chicken' } });
        fireEvent.click(analyzeButton);

        await screen.findByText('Error: API error');

        expect(screen.getByText('Error: API error')).toBeInTheDocument();
    });
});
