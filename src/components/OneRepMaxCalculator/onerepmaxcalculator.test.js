import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OneRepMaxCalculator from './onerepmaxcalculator';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.post('http://localhost:5000/onerepmax', (req, res, ctx) => {
    return res(ctx.json({ oneRepMax: '200', percentages: [{ percentage: '60', weight: '120' }, { percentage: '70', weight: '140' }] }));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('OneRepMaxCalculator', () => {
  it('renders correctly', () => {
    render(<OneRepMaxCalculator />);
    expect(screen.getByText('One Rep Max Calculator')).toBeInTheDocument();
  });

  it('updates form fields and submits form correctly', async () => {
    render(<OneRepMaxCalculator />);

    fireEvent.click(screen.getByLabelText('kg'));
    fireEvent.change(screen.getByLabelText('Weight Lifted (kg)'), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText('Reps Performed'), { target: { value: '10' } });
    fireEvent.click(screen.getByText('Calculate'));

    await waitFor(() => {
      expect(screen.getByText('Estimated 1 Rep Max:')).toBeInTheDocument();
      expect(screen.getByText('200.0 kg')).toBeInTheDocument();
      expect(screen.getByText('60%')).toBeInTheDocument();
      expect(screen.getByText('120.0 kg')).toBeInTheDocument();
      expect(screen.getByText('70%')).toBeInTheDocument();
      expect(screen.getByText('140.0 kg')).toBeInTheDocument();
    });
  });

  it('handles server error', async () => {
    server.use(
      rest.post('http://localhost:5000/onerepmax', (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    render(<OneRepMaxCalculator />);

    fireEvent.click(screen.getByLabelText('kg'));
    fireEvent.change(screen.getByLabelText('Weight Lifted (kg)'), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText('Reps Performed'), { target: { value: '10' } });
    fireEvent.click(screen.getByText('Calculate'));

    await waitFor(() => {
      expect(screen.queryByText('Estimated 1 Rep Max:')).not.toBeInTheDocument();
    });
  });
});
