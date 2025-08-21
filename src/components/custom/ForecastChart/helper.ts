import { DailyProps } from '@/contexts/appState';

const parseTime = (t: string) => {
  const [time, modifier] = t.split(' ');
  const [hours, minutes] = time.split(':').map(Number);

  // Destructure properly to make minutes const
  let hoursVar = hours;
  const minutesVar = minutes;

  if (modifier === 'PM' && hoursVar < 12) hoursVar += 12;
  if (modifier === 'AM' && hoursVar === 12) hoursVar = 0;

  return { hours: hoursVar, minutes: minutesVar };
};

export const isNight = (dt: string | Date, daily: DailyProps) => {
  const h = new Date(dt).getHours();

  const { hours: sunrise } = parseTime(daily.sunrise);
  const { hours: sunset } = parseTime(daily.sunset);

  return h < sunrise || h >= sunset;
};
