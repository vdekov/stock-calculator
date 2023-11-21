import { InputPriceAmount } from '@/components/InputPriceAmount';
import { fireEvent, render, screen } from '@/utils/test-utils';

describe('InputPriceAmount UI component', () => {
  beforeEach(() => {
    render(<InputPriceAmount label="Investment amount" value="100" onChange={() => {}} />);
  });

  it('renders as expected', () => {
    expect(screen.getByText(/investment amount/i)).toBeInTheDocument();
  });

  it('handles invalid values and displays an error message', () => {
    const input = screen.getByTestId('input-price-amount');

    fireEvent.change(input, { target: { value: '999999999' } });
    expect(screen.getByText(/❗️ the maximum amount allowed is/i)).toBeInTheDocument;
  });
});
