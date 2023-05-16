import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CalorieCalculator from './caloriecalculator';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.post('http://localhost:5000/calorie', (req, res, ctx) => {
    return res(ctx.json({ 
        maintenance: 2000, 
        mild_loss: 1750, 
        loss: 1500, 
        extreme_loss: 1250 
    }));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('CalorieCalculator', () => {
  it('renders correctly', () => {
    render(<CalorieCalculator />);
    expect(screen.getByText('Calorie Intake Calculator')).toBeInTheDocument();
  });

  it('updates form fields and submits form correctly', async () => {
    render(<CalorieCalculator />);

    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '25' } });
    fireEvent.click(screen.getByLabelText('Female'));
    fireEvent.change(screen.getByLabelText('Height (cm)'), { target: { value: '165' } });
    fireEvent.change(screen.getByLabelText('Weight (kg)'), { target: { value: '60' } });
    fireEvent.change(screen.getByText('Metric'), { target: { value: 'imperial' } });
    fireEvent.change(screen.getByText('Activity Level'), { target: { value: 'active' } });
    fireEvent.click(screen.getByText('Calculate Calories'));

    await waitFor(() => {
      expect(screen.getByText('Results:')).toBeInTheDocument();
      expect(screen.getByText('Maintain weight')).toBeInTheDocument();
      expect(screen.getByText('2000')).toBeInTheDocument();
      expect(screen.getByText('Mild weight loss (0.25 kg/week)')).toBeInTheDocument();
      expect(screen.getByText('1750')).toBeInTheDocument();
      expect(screen.getByText('Weight loss (0.5 kg/week)')).toBeInTheDocument();
      expect(screen.getByText('1500')).toBeInTheDocument();
      expect(screen.getByText('Extreme weight loss (1 kg/week)')).toBeInTheDocument();
      expect(screen.getByText('1250')).toBeInTheDocument();
    });
  });

  it('handles server error', async () => {
    server.use(
      rest.post('http://localhost:5000/calorie', (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    console.error = jest.fn();

    render(<CalorieCalculator />);

    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '25' } });
    fireEvent.click(screen.getByLabelText('Female'));
    fireEvent.change(screen.getByLabelText('Height (cm)'), { target: { value: '165' } });
    fireEvent.change(screen.getByLabelText('Weight (kg)'), { target: { value: '60' } });
    fireEvent.change(screen.getByText('Metric'), { target: { value: 'imperial' } });
    fireEvent.change(screen.getByText('Activity Level'), { target: { value: 'active' } });
    fireEvent.click(screen.getByText('Calculate Calories'));

    await waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });

    console.error.mockRestore();
  });
});
