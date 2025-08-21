import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import sunny from '@/assets/imgs/sunny.webp';
import cloudy from '@/assets/imgs/cloudy.png';
import rainy from '@/assets/imgs/rainy.png';
import snowy from '@/assets/imgs/snowy.png';
import night from '@/assets/imgs/nighty.webp';
import { useAppState } from '@/hooks/useAppState';
import SearchCities from '../SearchCities/SearchCities';
import {
  Navigation,
  Sunrise,
  Sunset,
  Sun,
  Cloud,
  CloudDrizzle,
  CloudSnow,
  CloudMoon,
} from 'lucide-react';
import { isNight } from '../ForecastChart/helper';

const getWeatherIcon = (description: string, isNight: boolean) => {
  const desc = description.toLowerCase();

  if (desc.includes('sun'))
    return isNight ? <CloudMoon className='w-4 h-4' /> : <Sun className='w-4 h-4' />;
  if (['cloud', 'cloudy'].some(term => desc.includes(term)))
    return isNight ? <CloudMoon className='w-4 h-4' /> : <Cloud className='w-4 h-4' />;
  if (['rain', 'thunderstorm', 'drizzle'].some(term => desc.includes(term)))
    return isNight ? <CloudMoon className='w-4 h-4' /> : <CloudDrizzle className='w-4 h-4' />;
  if (desc.includes('snow'))
    return isNight ? <CloudMoon className='w-4 h-4' /> : <CloudSnow className='w-4 h-4' />;

  return <Sun className='w-4 h-4' />;
};

const getWeatherImage = (code: number, isNight: boolean) => {
  if ([0, 1].includes(code)) return isNight ? night : sunny;
  if ([2, 3].includes(code)) return cloudy;
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return rainy;
  if ([71, 73, 75, 77, 85, 86].includes(code)) return snowy;

  return sunny;
};

const WeatherDetails = () => {
  const { weather, daily, location } = useAppState();

  return (
    <div className='flex flex-col  justify-between w-full h-full'>
      <div>
        <SearchCities />
        <section className=' font-extralight my-12'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center text-base'>
              <Navigation className='w-4 h-4' />
              <h1 className=' leading-9 pl-1'>{location}</h1>
            </div>
            <div className='flex items-center text-sm'>
              <Sunrise className='w-4 h-4' />
              <h1 className=' pl-1'> {daily?.sunrise}</h1>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <p className='text-xs'>{new Date().toDateString()}</p>
            <div className='flex items-center text-sm'>
              <Sunset className='w-4 h-4' />
              <h1 className=' pl-1'> {daily?.sunset}</h1>
            </div>
          </div>
        </section>
        <Carousel className='w-[70%] mx-auto'>
          <CarouselContent>
            {weather.map(item => (
              <CarouselItem key={item.temp}>
                <div className='flex flex-col items-center justify-center'>
                  <h1 className='text-7xl leading-20'>{Math.round(item.temp)}°</h1>
                  <div className='flex items-center gap-1 -ml-6'>
                    {getWeatherIcon(item.description, isNight(item.date, daily))}
                    <p className='text-xs'>
                      {isNight(item.date, daily) ? 'Night' : item.description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <img
        src={getWeatherImage(weather[0]?.code, isNight(weather[0]?.date, daily))}
        alt='weather illustration'
        className='w-[70%] mx-auto flex self-end'
      />
    </div>
  );
};

export default WeatherDetails;
