import Button from './Button';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

test('renders button with correct label', () => {
  const { getByText } = render(<Button label='Click me' />);
  const buttonElement = getByText(/Click me/i);
  expect(buttonElement).toBeInTheDocument();
});