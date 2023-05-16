import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WorkoutSuggestion from './workoutsuggestion';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.post('http://localhost:5000/workout/generate-workout', (req, res, ctx) => {
    return res(ctx.json({ workoutSuggestion: 'Mocked workout suggestion' }));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('WorkoutSuggestion', () => {
  it('renders correctly', () => {
    render(<WorkoutSuggestion />);
    expect(screen.getByText('Workout Suggestion')).toBeInTheDocument();
  });

  it('updates form fields and submits form correctly', async () => {
    render(<WorkoutSuggestion />);

    fireEvent.change(screen.getByLabelText('Gender'), { target: { value: 'male' } });
    fireEvent.change(screen.getByLabelText('Primary Goal'), { target: { value: 'lose fat' } });
    fireEvent.change(screen.getByLabelText('Training Method'), { target: { value: 'strength training' } });
    fireEvent.change(screen.getByLabelText('Workout Type'), { target: { value: 'weighted' } });
    fireEvent.change(screen.getByLabelText('Routine Focus'), { target: { value: 'strength' } });
    fireEvent.change(screen.getByLabelText('Strength Level'), { target: { value: 'beginner' } });
    fireEvent.change(screen.getByLabelText('Training Days per Week'), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText('Workout Time'), { target: { value: '45 mins' } });

    fireEvent.click(screen.getByText('Generate Workout'));

    await waitFor(() => {
      expect(screen.getByText('Workout Plan:')).toBeInTheDocument();
      expect(screen.getByText('Mocked workout suggestion')).toBeInTheDocument();
    });
  });

  it('handles server error', async () => {
    server.use(
      rest.post('http://localhost:5000/workout/generate-workout', (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    render(<WorkoutSuggestion />);

    fireEvent.change(screen.getByLabelText('Gender'), { target: { value: 'male' } });
    fireEvent.change(screen.getByLabelText('Primary Goal'), { target: { value: 'lose fat' } });
    fireEvent.change(screen.getByLabelText('Training Method'), { target: { value: 'strength training' } });
    fireEvent.change(screen.getByLabelText('Workout Type'), { target: { value: 'weighted' } });
    fireEvent.change(screen.getByLabelText('Routine Focus'), { target: { value: 'strength' } });
    fireEvent.change(screen.getByLabelText('Strength Level'), { target: { value: 'beginner' } });
    fireEvent.change(screen.getByLabelText('Training Days per Week'), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText('Workout Time'), { target: { value: '45 mins' } });

    fireEvent.click(screen.getByText('Generate Workout'));

    await waitFor(() => {
      expect(screen.queryByText('Workout Plan:')).not.toBeInTheDocument();
    });
  });
});
