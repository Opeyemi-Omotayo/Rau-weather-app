import { z } from 'zod';

const configSchema = z.object({
  VITE_APP_OPEN_METEO_API_URL: z.string(),
  VITE_APP_URL: z.string(),
  VITE_APP_OPEN_METEO_GEOCODING_API_URL: z.string(),
});

const config = configSchema.parse(import.meta.env);

export const apiUrl = config.VITE_APP_OPEN_METEO_API_URL;
export const appUrl = config.VITE_APP_URL;
export const geocodingApiUrl = config.VITE_APP_OPEN_METEO_GEOCODING_API_URL;