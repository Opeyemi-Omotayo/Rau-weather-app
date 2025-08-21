import { ResponsiveContainer, AreaChart, Area, YAxis, XAxis, ReferenceLine } from 'recharts';
import { isNight } from './helper';
import { useAppState } from '@/hooks/useAppState';

export default function ForecastChart({ data }: { data: any }) {
  const { daily } = useAppState();
  const iconForCode = (code: number, night: boolean) => {
    if ([0, 1].includes(code)) return night ? '🌙' : '☀️';
    if ([2].includes(code)) return night ? '🌙' : '⛅️';
    if ([3].includes(code)) return night ? '🌙' : '☁️';
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return night ? '🌙' : '🌧️';
    if ([71, 73, 75, 77, 85, 86].includes(code)) return night ? '🌙' : '❄️';
    if ([95, 96, 99].includes(code)) return night ? '🌙' : '⛈️';
    return '☁️';
  };

  return (
    <div className='w-full'>
      <div
        className='
    grid grid-flow-col auto-cols-[minmax(72px,1fr)]
    overflow-x-auto scrollbar-hide gap-2 mb-3
    sm:grid-cols-8 sm:grid-flow-row sm:auto-cols-auto sm:overflow-visible
  '
      >
        {data.map((pt: any) => (
          <div key={pt.idx} className='flex flex-col items-center'>
            <span className='text-base leading-none'>
              {iconForCode(pt.weathercode, isNight(pt.date, daily))}
            </span>
            <span className='text-[11px] text-gray-500 mt-1'>{pt.time}</span>
            <span className='text-sm text-gray-900 mt-1'>{Math.round(pt.temperature)}°</span>
          </div>
        ))}
      </div>

      <div className='relative h-14 2xl:h-28 rounded-xl overflow-hidden'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart data={data} margin={{ top: 4, right: 6, bottom: 0, left: 6 }}>
            <XAxis dataKey='idx' hide />
            <YAxis domain={[0, 100]} hide />
            {data.map((pt: any) => (
              <ReferenceLine key={`v-${pt.idx}`} x={pt.idx} stroke='#E5E7EB' strokeDasharray='0' />
            ))}
            <Area
              type='monotone'
              dataKey='precipProb'
              stroke='#5B9CFF'
              fill='#5B9CFF'
              fillOpacity={0.25}
              strokeWidth={2}
              isAnimationActive
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div
        className='
    grid grid-flow-col auto-cols-[minmax(72px,1fr)]
    overflow-x-auto scrollbar-hide gap-2 mt-3
    sm:grid-cols-8 sm:grid-flow-row sm:auto-cols-auto sm:overflow-visible
  '
      >
        {data.map((pt: any) => (
          <div key={`b-${pt.idx}`} className='text-center text-[11px] text-gray-500'>
            {Math.round(pt.precipProb)}%
          </div>
        ))}
      </div>
    </div>
  );
}
