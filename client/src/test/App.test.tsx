import { render, screen } from '@/utils/test-utils';
import App from '@/App';

describe('App', () => {
  it('the heading is visible', () => {
    render(<App />);
    expect(screen.getByText(/Stock Calculator v1/i)).toBeInTheDocument();
  });
});
