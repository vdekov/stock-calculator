import { ProfitTable } from '@/components/ProfitCalculator/ProfitTable';
import { render, screen } from '@/utils/test-utils';

describe('ProfitTable UI component', () => {
  it('renders as expected with stock data and investment amount', () => {
    const investmentAmount = 100;
    const stockHistory = {
      minDateTime: '2023-11-05T09:55:20.000Z',
      minPrice: 51.29,
      maxDateTime: '2023-11-05T09:55:21.000Z',
      maxPrice: 96.25,
    };

    render(<ProfitTable investmentAmount={investmentAmount} stockHistory={stockHistory} />);
    expect(screen.getByRole('cell', { name: /shares:/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /profit:/i })).toBeInTheDocument();
  });

  it('handles no profit notification', () => {
    const investmentAmount = 100;
    const stockHistory = {
      minDateTime: '2023-11-05T09:55:20.000Z',
      minPrice: 51.29,
      maxDateTime: '2023-11-05T09:55:21.000Z',
      maxPrice: 51.29,
    };

    render(<ProfitTable investmentAmount={investmentAmount} stockHistory={stockHistory} />);
    expect(screen.getByText(/❗️ there is no profit available for the specified criteria\./i)).toBeInTheDocument();
  });
});
