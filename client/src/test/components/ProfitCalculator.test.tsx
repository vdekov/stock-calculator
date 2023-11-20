import { ProfitCalculator } from '@/components/ProfitCalculator';
import { fireEvent, render, screen } from '@/utils/test-utils';

describe('ProfitCalculator UI component', () => {
  beforeEach(() => {
    render(<ProfitCalculator stockHistory={null} />);
  });

  it('renders as expected', () => {
    expect(screen.getByText(/💵 investment amount/i)).toBeInTheDocument();
  });

  it('reacts on investement amount input change', () => {
    const input = screen.getByTestId('input-investment');

    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 100 } });
    expect(input).toHaveValue(100);
  });

  it('not allows negative numbers', () => {
    const input = screen.getByTestId('input-investment');

    fireEvent.keyDown(input, { key: '-' });
    expect(input).toHaveValue(null);
    fireEvent.change(input, { target: { value: 123 } });
    fireEvent.keyDown(input, { key: '-' });
    expect(input).toHaveValue(123);
  });
});
