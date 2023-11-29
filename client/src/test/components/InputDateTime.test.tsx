import { InputDateTime } from '@/components/InputDateTime';
import { fireEvent, render, screen } from '@/utils/test-utils';

describe('InputDateTime UI component', () => {
  const props = {
    defaultValue: new Date('01.01.2023 00:00:00'),
  };

  it('renders as expected', () => {
    render(<InputDateTime {...props} />);

    expect(screen.getByLabelText(/📆 date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/🕗 time/i)).toBeInTheDocument();
    expect(screen.getByTestId('input-date')).toHaveAttribute('placeholder', 'YYYY-MM-DD');
    expect(screen.getByTestId('input-date')).toHaveValue('2023-01-01');
    expect(screen.getByTestId('input-time')).toHaveAttribute('placeholder', 'HH:MM:SS');
    expect(screen.getByTestId('input-time')).toHaveValue('00:00:00');
  });

  it('date reacts on change', () => {
    render(<InputDateTime {...props} />);

    const input = screen.getByTestId('input-date');
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: '2023-06-06' } });
    expect(input).toHaveValue('2023-06-06');
  });

  it('time reacts on invalid change', () => {
    render(<InputDateTime {...props} />);

    const input = screen.getByTestId('input-time');
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: '01:00:00' } });
    expect(input).toHaveValue('01:00:00');
  });

  it('handles invalid datetime', () => {
    const { container } = render(<InputDateTime {...props} isValid={false} />);

    expect(container).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('invalid');
  });
});
