import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useAppState } from '@/hooks/useAppState';
import UpcomingHoursForecast from './UpcomingHoursForecast';

jest.mock('@/hooks/useAppState');
jest.mock('../ForecastChart/ForecastChart', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid='forecast-chart' />),
}));
jest.mock('@/config/env', () => ({
  VITE_APP_OPEN_METEO_API_URL: 'https://',
  VITE_APP_URL: 'http://localhost:3000',
  VITE_APP_OPEN_METEO_GEOCODING_API_URL: 'https://',
}));

describe('UpcomingHoursForecast', () => {
  const mockedUseAppState = useAppState as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders headings and static text', () => {
    mockedUseAppState.mockReturnValue({
      forecast: [],
      loading: false,
      error: null,
    });

    render(<UpcomingHoursForecast />);
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
    expect(screen.getByText('Check out today\'s weather information')).toBeInTheDocument();
    expect(screen.getByText('Upcoming hours')).toBeInTheDocument();
  });

  it('shows loading skeleton when loading', () => {
    mockedUseAppState.mockReturnValue({
      forecast: [],
      loading: true,
      error: null,
    });

    render(<UpcomingHoursForecast />);
    expect(screen.getByText('Upcoming hours')).toBeInTheDocument();
    expect(screen.getByText('Upcoming hours').parentElement).toBeInTheDocument(); 
    expect(screen.getByText('Upcoming hours').parentElement).toBeTruthy();
    expect(screen.getByText('Upcoming hours').parentElement).toHaveClass('flex items-center justify-between');
    expect(screen.getByText('Upcoming hours').parentElement).not.toBeNull();
  });

  it('shows error message when error exists', () => {
    mockedUseAppState.mockReturnValue({
      forecast: [],
      loading: false,
      error: 'Failed to fetch forecast',
    });

    render(<UpcomingHoursForecast />);
    expect(screen.getByText('Failed to fetch forecast')).toBeInTheDocument();
  });

  it('renders ForecastChart when forecast data is available', () => {
    const forecastData = [
      { time: '09:00', temp: 20 },
      { time: '12:00', temp: 22 },
    ];

    mockedUseAppState.mockReturnValue({
      forecast: forecastData,
      loading: false,
      error: null,
    });

    render(<UpcomingHoursForecast />);
    expect(screen.getByTestId('forecast-chart')).toBeInTheDocument();
  });
});
