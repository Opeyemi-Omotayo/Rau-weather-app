import SegmentedBar from '@/components/Shared/SegmentedBar/SegmentedBar';
import CardWrapper from '../../Shared/CardWrapper/CardWrapper';
import IconWrapper from '../../Shared/IconWrapper/IconWrapper';
import { CloudDrizzle, Droplets, Thermometer, Wind, Umbrella, Sun } from 'lucide-react';
import SmallRangeBar from '@/components/Shared/SmallRangeBar/SmallRangeBar';
import { useAppState } from '@/hooks/useAppState';
import { ForecastItem } from '@/contexts/appState';

const MoreDetails = () => {
  const { forecast } = useAppState();

  const currentWeather: ForecastItem = forecast?.[0] ?? ({} as ForecastItem);
  const { humidity, windSpeed, precipProb, uvIndex, feelsLike, rain } = currentWeather;

  // segmented bar helper: returns an array of booleans indicating filled segments
  const segments = (value: number, segments = 5) => {
    const per = 100 / segments;
    const filled = Math.round(value / per);
    return new Array(segments).fill(0).map((_, i) => i < filled);
  };

  // segmented ranges for UV: ranges [0-2,3-5,6-7,8-10,11+]
  const uvSegments = (uv: number) => {
    if (uv <= 2) return [true, false, false, false, false];
    if (uv <= 5) return [true, true, false, false, false];
    if (uv <= 7) return [true, true, true, false, false];
    if (uv <= 10) return [true, true, true, true, false];
    return [true, true, true, true, true];
  };
  const humidityStatus = humidity < 40 ? 'good' : humidity > 60 ? 'bad' : 'normal';

  return (
    <section className='flex flex-col'>
      <h1 className='text-base text-black pb-6'>More details of today's weather</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 2xl:grid-cols-3 2xl:grid max-2xl:flex max-2xl:overflow-x-auto max-2xl:space-x-4 scrollbar-hide '>
        {/* Humidity */}
        <CardWrapper>
          <div className='flex items-center justify-between'>
            <h3 className='text-sm text-gray-500'>Humidity</h3>
            <IconWrapper>
              <Droplets />
            </IconWrapper>
          </div>
          <div className='flex items-center justify-center gap-3'>
            <div className='text-2xl font-semibold'>{Math.round(humidity)}%</div>
            <div className='text-sm text-gray-400'>{humidityStatus}</div>
          </div>
          <SmallRangeBar segmentsArr={segments(humidity, 5)} />
          <div className='flex justify-between text-[11px] text-gray-400 mt-2'>
            <span>good</span>
            <span>normal</span>
            <span className='text-right'>bad</span>
          </div>
        </CardWrapper>

        {/* Wind */}
        <CardWrapper>
          <div className='flex items-center justify-between'>
            <h3 className='text-sm text-gray-500'>Wind</h3>
            <IconWrapper>
              <Wind />
            </IconWrapper>
          </div>
          <div className='mt-2'>
            <div className='text-2xl text-center font-semibold'>{Math.round(windSpeed)} km/h</div>
          </div>

          <div className='relative mt-4'>
            <div className='h-2 bg-gray-200 rounded-full overflow-hidden'>
              <div
                className='h-full bg-blue-400'
                style={{ width: `${Math.min((windSpeed / 40) * 100, 100)}%` }}
              />
            </div>
            <div
              className='absolute -top-3 left-0'
              style={{ left: `${Math.min((windSpeed / 40) * 100, 100)}%` }}
            >
              <div className='w-2 h-6 bg-blue-400 rounded' />
            </div>
            <div className='flex justify-between text-[11px] text-gray-400 mt-2'>
              <span>0</span>
              <span>20</span>
              <span>40</span>
            </div>
          </div>
        </CardWrapper>

        {/* Precipitation */}
        <CardWrapper>
          <div className='flex items-center justify-between'>
            <h3 className='text-sm text-gray-500'>Precipitation</h3>
            <IconWrapper>
              <CloudDrizzle />
            </IconWrapper>
          </div>
          <div className='flex items-center justify-center gap-3 mt-2'>
            <div className='text-2xl font-semibold'>{precipProb} cm</div>
          </div>

          <SegmentedBar value={(precipProb / 5) * 100} segmentsCount={10} />
          <div className='flex justify-between text-[11px] text-gray-400 mt-2'>
            <span>0</span>
            <span>10</span>
            <span>90</span>
          </div>
        </CardWrapper>

        {/* UV index */}
        <CardWrapper>
          <div className='flex items-center justify-between'>
            <h3 className='text-sm text-gray-500'>UV index</h3>
            <IconWrapper>
              <Sun />
            </IconWrapper>
          </div>
          <div className='flex items-center justify-center gap-3 mt-1'>
            <div className='text-2xl font-semibold'>{uvIndex}</div>
            <div className='text-sm text-gray-400'>{uvIndex < 5 ? 'medium' : 'high'}</div>
          </div>

          <SmallRangeBar segmentsArr={uvSegments(uvIndex)} />
          <div className='flex justify-between text-[11px] text-gray-400 mt-2'>
            <span>0-2</span>
            <span>3-5</span>
            <span>6-7</span>
            <span>8-10</span>
            <span>11+</span>
          </div>
        </CardWrapper>

        {/* Feels like */}
        <CardWrapper>
          <div className='flex items-center justify-between'>
            <h3 className='text-sm text-gray-500'>Feels like</h3>
            <IconWrapper>
              <Thermometer />
            </IconWrapper>
          </div>
          <div className='mt-1'>
            <div className='text-2xl text-center font-semibold'>{Math.round(feelsLike)}°</div>
          </div>

          <div className='mt-2'>
            <div className='flex items-center justify-between text-[11px] text-gray-400'>
              <span>0°</span>
              <span>25°</span>
              <span>50°</span>
            </div>
            <div className='h-2 bg-gray-200 rounded-full mt-2 overflow-hidden'>
              <div
                className='h-full bg-blue-500'
                style={{
                  width: `${Math.min((feelsLike / 50) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        </CardWrapper>

        {/* Chance of rain */}
        <CardWrapper>
          <div className='flex items-center justify-between'>
            <h3 className='text-sm text-gray-500'>Chance of rain</h3>
            <IconWrapper>
              <Umbrella />
            </IconWrapper>
          </div>
          <div className='flex items-center justify-center gap-3 mt-1'>
            <div className='text-2xl font-semibold'>{Math.round(rain)}%</div>
          </div>

          <SegmentedBar value={rain} segmentsCount={4} small />
          <div className='flex justify-between text-[11px] text-gray-400 mt-2'>
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </CardWrapper>
      </div>
    </section>
  );
};

export default MoreDetails;
