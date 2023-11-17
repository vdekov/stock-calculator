/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryForm } from '@/components/QueryForm';
import { fireEvent, render } from '@testing-library/react';
import { screen } from '@/utils/test-utils';

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

  it('handles valid from date change', () => {
    const [_, toInputDateTime] = screen.getAllByTestId('input-date');

    fireEvent.change(toInputDateTime, { target: { value: '2023-11-11' } });
    expect(toInputDateTime).toHaveDisplayValue('2023-11-11');
  });

  it('submits the form as expected', () => {
    const buttonSubmit = screen.getByTestId('btn-submit');

    fireEvent.click(buttonSubmit);
  });
});
