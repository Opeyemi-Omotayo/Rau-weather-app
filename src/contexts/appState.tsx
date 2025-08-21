import { createContext, useState, useCallback } from 'react';
import axios from 'axios';
import { getWeatherDescription } from '@/components/custom/WeatherDetails/helper';

const DEFAULT_COORDS = { latitude: 52.52437, longitude: 13.41053 }; // Berlin
const POLL_INTERVAL = 30 * 60 * 1000; // 30 minutes

type Coords = { latitude: number; longitude: number };
type OpenMeteoResponse = {
  hourly: {
    time?: string[];
    rain?: number[];
    temperature_2m?: number[];
    apparent_temperature?: number[];
    precipitation_probability?: number[];
    weathercode?: number[];
    relative_humidity_2m?: number[];
    uv_index?: number[];
    wind_speed_10m?: number[];
  };
  daily: {
    sunrise?: string[];
    sunset?: string[];
  };
};

export type ForecastItem = {
  date: Date;
  time: string;
  rain: number;
  temperature: number;
  feelsLike: number;
  precipProb: number;
  weathercode: number;
  humidity: number;
  uvIndex: number;
  windSpeed: number;
  idx?: number;
};

export type WeatherProps = {
  temp: number;
  description: string;
  date: Date;
};

export type DailyProps = {
  sunrise: string;
  sunset: string;
};

export type AppStateContextType = {
  forecast: ForecastItem[] | null;
  loading: boolean;
  error: string | null;
  weather: WeatherProps[];
  daily: DailyProps;
  query: string;
  setQuery: (query: string) => void;
  getPosition: () => Promise<GeolocationPosition>;
  POLL_INTERVAL: number;
  location: string;
  setLocation: (location: string) => void;
  fetchForecast: (coords?: Coords, signal?: AbortSignal) => Promise<void>;
};

export const AppStateContext = createContext<AppStateContextType>({} as AppStateContextType);

export const AppStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useState('Berlin, Germany');
  const [location, setLocation] = useState<string>('Berlin, Germany');
  const [forecast, setForecast] = useState<ForecastItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [daily, setDaily] = useState<DailyProps>({ sunrise: '', sunset: '' });

  const getPosition = (): Promise<GeolocationPosition> =>
    new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));

  const buildForecastUrl = (lat: number, lon: number) => {
    const params = new URLSearchParams({
      latitude: String(lat),
      longitude: String(lon),
      hourly:
        'temperature_2m,apparent_temperature,precipitation_probability,weathercode,rain,relative_humidity_2m,uv_index,wind_speed_10m',
      daily: 'sunrise,sunset',
      forecast_days: '2',
      timezone: 'auto',
    });
    return `${import.meta.env.VITE_APP_OPEN_METEO_API_URL}/forecast?${params.toString()}`;
  };

  const formatTime12h = (iso: string) =>
    new Date(iso).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

  const fetchForecast = useCallback(async (coords?: Coords, signal?: AbortSignal) => {
    try {
      setLoading(true);
      setError(null);

      const { latitude: lat, longitude: lon } = coords ?? DEFAULT_COORDS;

      const url = buildForecastUrl(lat, lon);
      const { data } = await axios.get<OpenMeteoResponse>(url, { signal });

      const { hourly, daily } = data;

      const {
        time: times = [],
        rain = [],
        temperature_2m: temps = [],
        apparent_temperature: feels = [],
        precipitation_probability: probs = [],
        weathercode: codes = [],
        relative_humidity_2m: humidity = [],
        uv_index: uv = [],
        wind_speed_10m: wind = [],
      } = hourly ?? {};
      
      setDaily({
        sunrise: daily?.sunrise?.[0] ? formatTime12h(daily.sunrise[0]) : '',
        sunset: daily?.sunset?.[0] ? formatTime12h(daily.sunset[0]) : '',
      });
      const merged = times.map((iso: string, i: number) => {
        const date = new Date(iso);
        return {
          date,
          time: formatTime12h(iso),
          rain: Number(rain[i] ?? 0),
          temperature: Number(temps[i] ?? 0),
          feelsLike: Number(feels[i] ?? 0),
          precipProb: Number(probs[i] ?? 0),
          weathercode: Number(codes[i] ?? 3),
          humidity: Number(humidity[i] ?? 0),
          uvIndex: Number(uv[i] ?? 0),
          windSpeed: Number(wind[i] ?? 0),
        };
      });

      const now = new Date();
      const idx = merged.findIndex((p: any) => p.date >= now);
      const startIdx = idx === -1 ? Math.max(0, merged.length - 8) : idx;

      const slice = merged
        .slice(startIdx, startIdx + 8)
        .map((p: any, i: number) => ({ ...p, idx: i }));

      if (slice[0]) slice[0].time = 'Now';

      setForecast(slice);
    } catch (err: any) {
      if (!axios.isCancel(err)) {
        setError(err?.message || 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const weather: WeatherProps[] =
    forecast?.map(item => ({
      temp: item.temperature,
      description: getWeatherDescription(item.weathercode),
      date: item.date,
    })) || [];

  return (
    <AppStateContext.Provider
      value={{
        forecast,
        loading,
        error,
        weather,
        daily,
        setQuery,
        query,
        getPosition,
        POLL_INTERVAL,
        location,
        setLocation,
        fetchForecast,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
