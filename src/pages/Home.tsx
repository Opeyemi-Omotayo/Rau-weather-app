import { useEffect } from 'react';
import { useAppState } from '@/hooks/useAppState';
import MoreDetails from '@/components/custom/MoreDetails/MoreDetails';
import WeatherDetails from '@/components/custom/WeatherDetails/WeatherDetails';
import UpcomingHoursForecast from '@/components/custom/UpcomingHoursForecast/UpcomingHoursForecast';
import { Loader } from '@/components/Shared/Loader/Loader';

const Home = () => {
  const { fetchForecast, POLL_INTERVAL, loading } = useAppState();
  const DEFAULT_COORDS = { latitude: 52.52437, longitude: 13.41053 }; // Berlin

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    (async () => {
      await fetchForecast(DEFAULT_COORDS);

      intervalId = setInterval(async () => {
        await fetchForecast(DEFAULT_COORDS);
      }, POLL_INTERVAL);
    })();

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [fetchForecast]);

  return (
    <main className='flex justify-center items-center bg-blue-200 py-[5%] xl:py-0 h-full xl:h-[100vh] text-white'>
      <div className='flex flex-col lg:flex-row justify-between w-[95%] xl:w-[85%] max-2xl:w-[80%] bg-blue-400 h-[90%] xl:h-[85%] max-2xl:h-[80%] rounded-[45px]'>
        <div className='p-6 xl:p-8 w-full lg:w-[25%] '>
          <WeatherDetails />
        </div>
        <div className='bg-blue-100 w-full lg:w-[75%] rounded-[45px] p-6 xl:p-8 overflow-scroll scrollbar-hide'>
          {loading ? (
            <Loader />
          ) : (
            <>
              <UpcomingHoursForecast />
              <MoreDetails />
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
