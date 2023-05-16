import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import RecipeFinder from './recipefinder';

jest.mock('axios');

describe('RecipeFinder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without errors and with initial state', () => {
    render(<RecipeFinder />);
    expect(screen.getByLabelText('Search for recipes')).toBeInTheDocument();
    expect(screen.getByText('Recipe Finder')).toBeInTheDocument();
    expect(screen.getByText('Enter your favorite dish and get suggested recipes as well as instructions')).toBeInTheDocument();
    expect(screen.queryByTestId('recipe-table')).toBeNull();
  });

  test('handles form submission and displays recipes', async () => {
    const mockRecipes = [
      {
        title: 'Recipe 1',
        ingredients: 'Ingredient 1|Ingredient 2',
        servings: 2,
        instructions: 'Instructions for Recipe 1',
      },
      {
        title: 'Recipe 2',
        ingredients: 'Ingredient 3|Ingredient 4',
        servings: 4,
        instructions: 'Instructions for Recipe 2',
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockRecipes });

    render(<RecipeFinder />);

    const queryInput = screen.getByLabelText('Search for recipes');
    const searchButton = screen.getByText('Search');

    fireEvent.change(queryInput, { target: { value: 'chicken' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/recipe?query=chicken');
      expect(screen.getByTestId('recipe-table')).toBeInTheDocument();
      expect(screen.getByText('Recipe 1')).toBeInTheDocument();
      expect(screen.getByText('Ingredient 1, Ingredient 2')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('Instructions for Recipe 1')).toBeInTheDocument();
    });
  });

  test('handles error during form submission', async () => {
    axios.get.mockRejectedValueOnce(new Error('Request failed'));

    render(<RecipeFinder />);

    const queryInput = screen.getByLabelText('Search for recipes');
    const searchButton = screen.getByText('Search');

    fireEvent.change(queryInput, { target: { value: 'pasta' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/recipe?query=pasta');
      expect(console.error).toHaveBeenCalledWith('Error fetching recipes:', expect.any(Error));
      expect(screen.getByText('Error fetching recipes')).toBeInTheDocument();
    });
  });
});
