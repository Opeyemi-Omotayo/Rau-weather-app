import { DailyProps } from '@/contexts/appState';

const parseTime = (t: string) => {
  const [time, modifier] = t.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (modifier === 'PM' && hours < 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;

  return { hours, minutes };
};

export const isNight = (dt: string | Date, daily: DailyProps) => {
  const h = new Date(dt).getHours();

  const { hours: sunrise } = parseTime(daily.sunrise);
  const { hours: sunset } = parseTime(daily.sunset);

  return h < sunrise || h >= sunset;
};
