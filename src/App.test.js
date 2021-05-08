import { render, screen, cleanup } from '@testing-library/react';
import App from './components/App/App';

afterEach(cleanup)

test('renders search box on app', () => {
  render(<App />);
  const searchUnsplash = screen.getByText(/Enter a search term.../i)
  expect(searchUnsplash).toBeInTheDocument();

});
