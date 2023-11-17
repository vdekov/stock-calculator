/* eslint-disable @typescript-eslint/no-unused-vars */
import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';
import { QueryForm } from '@/components/QueryForm';
import { fireEvent, render } from '@testing-library/react';
import { screen, userEvent } from '@/utils/test-utils';

const stockHistory = {
  minDateTime: '2023-11-05T09:55:20.000Z',
  minPrice: '51.29',
  maxDateTime: '2023-11-05T09:55:21.000Z',
  maxPrice: '96.25',
};

const restHandlers = [
  http.post('http://localhost:3000/api/stock/history', () => HttpResponse.json(stockHistory, { status: 200 })),
];

const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
//  Close server after all tests
afterAll(() => server.close());
// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

describe('QueryForm UI component', () => {
  beforeEach(() => {
    render(<QueryForm />);
  });

  it('renders as expected', () => {
    expect(screen.getByText(/From/i)).toBeInTheDocument();
    expect(screen.getByText(/To/i)).toBeInTheDocument();
  });

  it('from date must be no later than now', () => {
    const [fromInputDateTime] = screen.getAllByTestId('input-date');

    fireEvent.change(fromInputDateTime, { target: { value: '2044-01-01' } });
    expect(screen.getByText(/🚨 start date must be no later than now\./i));
  });

  it('handles invalid from date', () => {
    const [fromInputDateTime] = screen.getAllByTestId('input-date');

    fireEvent.change(fromInputDateTime, { target: { value: '2023-02-31' } });
    expect(screen.getByText(/🚨 invalid start date/i));
  });

  it('handles valid from date change', () => {
    const [fromInputDateTime] = screen.getAllByTestId('input-date');

    fireEvent.change(fromInputDateTime, { target: { value: '2023-11-11' } });
    expect(fromInputDateTime).toHaveDisplayValue('2023-11-11');
  });

  it('to date must be no later than now', () => {
    const [_, toInputDateTime] = screen.getAllByTestId('input-date');

    fireEvent.change(toInputDateTime, { target: { value: '2044-01-01' } });
    expect(screen.getByText(/🚨 end date must be no later than now\./i));
  });

  it('from date must be no later than to date', () => {
    const [fromInputDateTime, toInputDateTime] = screen.getAllByTestId('input-date');

    fireEvent.change(fromInputDateTime, { target: { value: '2023-01-02' } });
    fireEvent.change(toInputDateTime, { target: { value: '2023-01-01' } });
    expect(screen.getByText(/🚨 start date must precede end date\./i));
  });

  it('handles invalid to date', () => {
    const [_, toInputDateTime] = screen.getAllByTestId('input-date');

    fireEvent.change(toInputDateTime, { target: { value: '2023-02-31' } });
    expect(screen.getByText(/🚨 invalid end date/i));
  });

  it('handles valid to date change', () => {
    const [fromInputDateTime, toInputDateTime] = screen.getAllByTestId('input-date');

    fireEvent.change(fromInputDateTime, { target: { value: '2023-11-10' } });
    fireEvent.change(toInputDateTime, { target: { value: '2023-11-11' } });
    expect(toInputDateTime).toHaveDisplayValue('2023-11-11');
  });

  it('handles valid form response', async () => {
    const buttonSubmit = screen.getByTestId('btn-submit');
    await userEvent.click(buttonSubmit);

    expect(screen.getByRole('cell', { name: /sunday, november 5, 2023 at 11:55:20/i }));
    expect(screen.getByRole('cell', { name: /sunday, november 5, 2023 at 11:55:21/i }));
  });

  it('handles network error', async () => {
    server.use(http.post('http://localhost:3000/api/stock/history', () => HttpResponse.error()));
    const buttonSubmit = screen.getByTestId('btn-submit');
    await userEvent.click(buttonSubmit);

    expect(screen.getByText(/🚨 ops! something went wrong!/i));
  });

  it('handles invalid form response', async () => {
    server.use(
      http.post(
        'http://localhost:3000/api/stock/history',
        () => new HttpResponse(JSON.stringify({ statusCode: 400, message: 'Bad request parameters' }), { status: 404 }),
      ),
    );
    const buttonSubmit = screen.getByTestId('btn-submit');
    await userEvent.click(buttonSubmit);

    expect(screen.getByText(/🚨 invalid parameters\. please, try again\./i));
  });
});
