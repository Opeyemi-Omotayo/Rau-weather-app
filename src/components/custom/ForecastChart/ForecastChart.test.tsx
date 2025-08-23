import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ForecastChart from './ForecastChart';
import { ForecastItem } from '@/contexts/appState';

// Mock environment variables
jest.mock('@/config/env', () => ({
  VITE_APP_OPEN_METEO_API_URL: 'https://',
  VITE_APP_URL: 'http://localhost:3000',
  VITE_APP_OPEN_METEO_GEOCODING_API_URL: 'https://',
}));

// Mock ResizeObserver for recharts ResponsiveContainer
globalThis.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock the helper function if needed
jest.mock('./helper', () => ({
  isNight: jest.fn(() => false), 
}));

describe('ForecastChart', () => {
  const data: ForecastItem[] = [
    {
      idx: 1,
      weathercode: 0,
      date: new Date('2023-03-01T12:00:00.000Z'),
      time: '12:00',
      temperature: 20,
      precipProb: 0.5,
      precipitation: 0,
      rain: 0,
      feelsLike: 0,
      humidity: 0,
      uvIndex: 0,
      windSpeed: 0,
    },
    {
      idx: 2,
      weathercode: 51,
      date: new Date('2023-03-01T18:00:00.000Z'),
      time: '18:00',
      temperature: 15,
      precipProb: 0.8,
      precipitation: 0,
      rain: 0,
      feelsLike: 15,
      humidity: 87,
      uvIndex: 2,
      windSpeed: 4,
    },
  ];

  it('renders with valid data', () => {
    const { getByText } = render(<ForecastChart data={data} />);
    expect(getByText('12:00')).toBeInTheDocument();
    expect(getByText('18:00')).toBeInTheDocument();
    expect(getByText('20°')).toBeInTheDocument();
    expect(getByText('15°')).toBeInTheDocument();
  });

  it('renders with invalid data (empty array)', () => {
    const { queryByText } = render(<ForecastChart data={[]} />);
    expect(queryByText('12:00')).not.toBeInTheDocument();
    expect(queryByText('18:00')).not.toBeInTheDocument();
  });
});
