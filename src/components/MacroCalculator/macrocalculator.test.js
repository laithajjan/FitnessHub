import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MacroCalculator from './macrocalculator';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
    rest.post('http://localhost:5000/macro', (req, res, ctx) => {
        return res(ctx.json({
            Balanced: { Protein: '100', Fat: '70', Carbs: '230' },
            'Low Fat': { Protein: '120', Fat: '50', Carbs: '250' },
            'Low Carb': { Protein: '140', Fat: '80', Carbs: '180' },
            'High Protein': { Protein: '160', Fat: '70', Carbs: '210' },
        }));
    }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('MacroCalculator', () => {
    it('renders correctly', () => {
        render(<MacroCalculator />);
        expect(screen.getByText('Macro Calculator')).toBeInTheDocument();
    });

    it('updates form fields and submits form correctly', async () => {
        render(<MacroCalculator />);

        fireEvent.change(screen.getByLabelText('Age'), { target: { value: '25' } });
        fireEvent.click(screen.getByLabelText('Female'));
        fireEvent.change(screen.getByLabelText('Height'), { target: { value: '165' } });
        fireEvent.change(screen.getByLabelText('Weight'), { target: { value: '60' } });
        fireEvent.change(screen.getByText('Metric (cm, kg)'), { target: { value: 'imperial' } });
        fireEvent.change(screen.getByText('Light'), { target: { value: 'moderate' } });
        fireEvent.change(screen.getByText('Lose Weight'), { target: { value: 'maintain' } });
        fireEvent.click(screen.getByText('Calculate'));

        await waitFor(() => {
            expect(screen.getByText('Your Results')).toBeInTheDocument();
            expect(screen.getByText('Balanced')).toBeInTheDocument();
            expect(screen.getByText('Protein: 100g')).toBeInTheDocument();
            expect(screen.getByText('Fat: 70g')).toBeInTheDocument();
            expect(screen.getByText('Carbs: 230g')).toBeInTheDocument();
            expect(screen.getByText('Low Fat')).toBeInTheDocument();
            expect(screen.getByText('Protein: 120g')).toBeInTheDocument();
            expect(screen.getByText('Fat: 50g')).toBeInTheDocument();
            expect(screen.getByText('Carbs: 250g')).toBeInTheDocument();
            expect(screen.getByText('Low Carb')).toBeInTheDocument();
            expect(screen.getByText('Protein: 140g')).toBeInTheDocument();
            expect(screen.getByText('Fat: 80g')).toBeInTheDocument();
            expect(screen.getByText('Carbs: 180g')).toBeInTheDocument();
            expect(screen.getByText('High Protein')).toBeInTheDocument();
            expect(screen.getByText('Protein: 160g')).toBeInTheDocument();
            expect(screen.getByText('Fat: 70g')).toBeInTheDocument();
            expect(screen.getByText('Carbs: 210g')).toBeInTheDocument();
        });
    });

    it('handles server error', async () => {
        server.use(
            rest.post('http://localhost:5000/macro', (req, res, ctx) => {
                return res(ctx.status(500));
            }),
        );

        console.error = jest.fn();

        render(<MacroCalculator />);

        fireEvent.change(screen.getByLabelText('Age'), { target: { value: '25' } });
        fireEvent.click(screen.getByLabelText('Female'));
        fireEvent.change(screen.getByLabelText('Height'), { target: { value: '165' } });
        fireEvent.change(screen.getByLabelText('Weight'), { target: { value: '60' } });
        fireEvent.change(screen.getByText('Metric (cm, kg)'), { target: { value: 'imperial' } });
        fireEvent.change(screen.getByText('Light'), { target: { value: 'moderate' } });
        fireEvent.change(screen.getByText('Lose Weight'), { target: { value: 'maintain' } });
        fireEvent.click(screen.getByText('Calculate'));
        await waitFor(() => {
            expect(console.error).toHaveBeenCalled();
        });

        console.error.mockRestore();
    });
});      
