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
    const input = screen.getByTestId('input-price-amount');

    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: '100' } });
    expect(input).toHaveValue('100');
    fireEvent.change(input, { target: { value: '' } });
    expect(input).toHaveValue('');
  });
});
