import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import MoreDetails from './MoreDetails';

// Mock environment variables
jest.mock('@/config/env', () => ({
  VITE_APP_OPEN_METEO_API_URL: 'https://',
  VITE_APP_URL: 'http://localhost:3000',
  VITE_APP_OPEN_METEO_GEOCODING_API_URL: 'https://',
}));

describe('MoreDetails component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<MoreDetails />);
    expect(getByText('More details of today\'s weather')).toBeInTheDocument();
  });

  it('displays humidity status', () => {
    const { getByText } = render(<MoreDetails />);
    expect(getByText(/humidity/i)).toBeInTheDocument();
  });

  it('displays wind speed', () => {
    const { getByText } = render(<MoreDetails />);
    expect(getByText(/wind/i)).toBeInTheDocument();
  });

  it('displays precipitation', () => {
    const { getByText } = render(<MoreDetails />);
    expect(getByText(/precipitation/i)).toBeInTheDocument();
  });

  it('displays UV index', () => {
    const { getByText } = render(<MoreDetails />);
    expect(getByText(/uv index/i)).toBeInTheDocument();
  });

  it('displays feels like temperature', () => {
    const { getByText } = render(<MoreDetails />);
    expect(getByText(/feels like/i)).toBeInTheDocument();
  });

  it('displays chance of rain', () => {
    const { getByText } = render(<MoreDetails />);
    expect(getByText(/chance of rain/i)).toBeInTheDocument();
  });
});
