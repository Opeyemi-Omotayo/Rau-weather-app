import { DailyProps } from '@/contexts/appState';

const hourFromISO = (iso: string) => new Date(iso).getHours();

export const isNight = (dt: string | Date, daily: DailyProps) => {
  const h = new Date(dt).getHours();

  const sunrise = hourFromISO(daily.sunrise);
  const sunset = hourFromISO(daily.sunset);

  return h < sunrise || h >= sunset;
};
