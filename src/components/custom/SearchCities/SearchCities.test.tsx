import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import SearchCities from './SearchCities';
import { useAppState } from '@/hooks/useAppState';

jest.mock('axios');
jest.mock('@/hooks/useAppState');
jest.mock('@/config/env', () => ({
  VITE_APP_OPEN_METEO_API_URL: 'https://',
  VITE_APP_URL: 'http://localhost:3000',
  VITE_APP_OPEN_METEO_GEOCODING_API_URL: 'https://',
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SearchCities component', () => {
  const setQuery = jest.fn();
  const setLocation = jest.fn();
  const fetchForecast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppState as jest.Mock).mockReturnValue({
      query: '',
      setQuery,
      setLocation,
      fetchForecast,
    });
  });

  it('renders input', () => {
    render(<SearchCities />);
    expect(screen.getByPlaceholderText('Berlin, Germany')).toBeInTheDocument();
  });

  it('fetches suggestions when typing more than 2 characters', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        results: [
          { name: 'Berlin', country: 'DE', latitude: 52.52, longitude: 13.405 },
          { name: 'Berchtesgaden', country: 'DE', latitude: 47.63, longitude: 13.0 },
        ],
      },
    });

    render(<SearchCities />);
    const input = screen.getByPlaceholderText('Berlin, Germany');
    fireEvent.change(input, { target: { value: 'Ber' } });

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('Ber')
      );
    });

    expect(await screen.findByText('Berlin, DE')).toBeInTheDocument();
    expect(await screen.findByText('Berchtesgaden, DE')).toBeInTheDocument();
  });

  it('selecting a suggestion updates query, location, and fetchForecast', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        results: [
          { name: 'Berlin', country: 'DE', latitude: 52.52, longitude: 13.405 },
        ],
      },
    });

    render(<SearchCities />);
    const input = screen.getByPlaceholderText('Berlin, Germany');
    fireEvent.change(input, { target: { value: 'Ber' } });

    const suggestion = await screen.findByText('Berlin, DE');
    fireEvent.click(suggestion);

    expect(setQuery).toHaveBeenCalledWith('Berlin, DE');
    expect(setLocation).toHaveBeenCalledWith('Berlin, DE');
    expect(fetchForecast).toHaveBeenCalledWith({ latitude: 52.52, longitude: 13.405 });
    expect(screen.queryByText('Berlin, DE')).not.toBeInTheDocument(); // suggestions cleared
  });

  it('clears suggestions if less than 2 characters typed', async () => {
    render(<SearchCities />);
    const input = screen.getByPlaceholderText('Berlin, Germany');
    fireEvent.change(input, { target: { value: 'B' } });

    await waitFor(() => {
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });
  });
});
