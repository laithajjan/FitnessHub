import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BMICalculator from './bmicalculator';
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
    fetchMock.resetMocks();
});

test('renders BMI Calculator correctly', async () => {
    render(<BMICalculator />);

    const title = screen.getByText(/BMI Calculator/i);
    expect(title).toBeInTheDocument();

    const metricRadio = screen.getByLabelText(/Metric \(cm\/kg\)/i);
    fireEvent.click(metricRadio);

    const heightField = screen.getByLabelText(/Height \(cm\)/i);
    const weightField = screen.getByLabelText(/Weight \(kg\)/i);

    fireEvent.change(heightField, { target: { value: '170' } });
    fireEvent.change(weightField, { target: { value: '70' } });

    fetchMock.mockResponseOnce(JSON.stringify({ bmi: 24.22, category: 'Normal weight' }));

    const calculateButton = screen.getByText(/Calculate BMI/i);
    fireEvent.click(calculateButton);

    expect(fetchMock).toHaveBeenCalledWith('http://localhost:5000/bmi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ heightCm: '170', heightFt: '', heightIn: '', weightKg: '70', weightLbs: '', unitSystem: 'metric' }),
    });

    await waitFor(() => screen.getByText(/Your BMI: 24.2/i));
    await waitFor(() => screen.getByText(/Your BMI category: Normal weight/i));
});
