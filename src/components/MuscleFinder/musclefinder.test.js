import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExerciseTable from './ExerciseTable';

describe('ExerciseTable', () => {
    test('renders the component', () => {
        render(<ExerciseTable />);

        expect(screen.getByText('Search Exercises')).toBeInTheDocument();
        expect(
            screen.getByText('Discover tailored exercises by specifying your target muscle group. Unleash your potential now!')
        ).toBeInTheDocument();
        expect(screen.getByLabelText('Muscle')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    });

    test('fetches and displays exercises on form submission', async () => {
        const mockExercises = [
            {
                name: 'Exercise 1',
                type: 'Type 1',
                muscle: 'Muscle 1',
                equipment: 'Equipment 1',
                difficulty: 'Difficulty 1',
                instructions: 'Instructions 1',
            },
            {
                name: 'Exercise 2',
                type: 'Type 2',
                muscle: 'Muscle 2',
                equipment: 'Equipment 2',
                difficulty: 'Difficulty 2',
                instructions: 'Instructions 2',
            },
        ];

        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockExercises),
            })
        );

        render(<ExerciseTable />);

        const muscleInput = screen.getByLabelText('Muscle');
        const searchButton = screen.getByRole('button', { name: 'Search' });

        fireEvent.change(muscleInput, { target: { value: 'Biceps' } });
        fireEvent.click(searchButton);

        expect(global.fetch).toHaveBeenCalledWith('https://api.api-ninjas.com/v1/exercises?muscle=Biceps', {
            headers: {
                'X-Api-Key': process.env.REACT_APP_MUSCLE_FINDER_API_KEY,
            },
        });

        expect(await screen.findByText('Exercise 1')).toBeInTheDocument();
        expect(screen.getByText('Type 1')).toBeInTheDocument();
        expect(screen.getByText('Muscle 1')).toBeInTheDocument();
        expect(screen.getByText('Equipment 1')).toBeInTheDocument();
        expect(screen.getByText('Difficulty 1')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Show Instructions' })).toBeInTheDocument();

        expect(await screen.findByText('Exercise 2')).toBeInTheDocument();
        expect(screen.getByText('Type 2')).toBeInTheDocument();
        expect(screen.getByText('Muscle 2')).toBeInTheDocument();
        expect(screen.getByText('Equipment 2')).toBeInTheDocument();
        expect(screen.getByText('Difficulty 2')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Show Instructions' })).toBeInTheDocument();
    });

    test('toggles instructions visibility on button click', async () => {
        const mockExercises = [
            {
                name: 'Exercise 1',
                type: 'Type 1',
                muscle: 'Muscle 1',
                equipment: 'Equipment 1',
                difficulty: 'Difficulty 1',
                instructions: 'Instructions 1',
            },
        ];

        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockExercises),
            })
        );

        render(<ExerciseTable />);

        const muscleInput = screen.getByLabelText('Muscle');
        const searchButton = screen.getByRole('button', { name: 'Search' });

        fireEvent.change(muscleInput, { target: { value: 'Biceps' } });
        fireEvent.click(searchButton);

        const instructionsButton = screen.getByRole('button', { name: 'Show Instructions' });
        expect(screen.getByText('Instructions 1')).not.toBeVisible();
        fireEvent.click(instructionsButton);
        expect(await screen.findByText('Instructions 1')).toBeVisible();

        fireEvent.click(instructionsButton);
        expect(screen.getByText('Instructions 1')).not.toBeVisible();
    });
});    
