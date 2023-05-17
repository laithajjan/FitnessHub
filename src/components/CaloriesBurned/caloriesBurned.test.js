import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CaloriesBurned from './caloriesBurned';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      {
        "name": "Martial arts, kick boxing",
        "calories_per_hour": 726,
        "duration_minutes": 60,
        "total_calories": 726
      }
    ]),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

describe('CaloriesBurned', () => {
  test('renders CaloriesBurned component', async () => {
    render(<CaloriesBurned />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'boxing' } });
    fireEvent.submit(screen.getByRole('form'));
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(fetch).toHaveBeenCalledWith('https://api.api-ninjas.com/v1/caloriesburned?activity=boxing', {
      headers: {
        'X-Api-Key': process.env.REACT_APP_MUSCLE_FINDER_API_KEY,
      },
    });
    expect(screen.getByText('Martial arts, kick boxing')).toBeInTheDocument();
    expect(screen.getByText('726')).toBeInTheDocument();
    expect(screen.getByText('60')).toBeInTheDocument();
    expect(screen.getByText('726')).toBeInTheDocument();
  });
});
