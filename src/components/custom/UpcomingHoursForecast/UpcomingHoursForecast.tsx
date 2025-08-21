import { useAppState } from '@/hooks/useAppState';
import ForecastChart from '../ForecastChart/ForecastChart';


export default function UpcomingHoursForecast() {
  const { forecast, error, loading} = useAppState();

  return (
    <div>
      <h1 className='text-lg text-black'>Welcome!</h1>
      <p className='text-sm text-gray-500'>Check out today's weather information</p>

      <div className='bg-white rounded-3xl my-8 p-6 shadow-sm'>
        <div className='flex items-center justify-between'>
          <h2 className='text-sm text-gray-500'>Upcoming hours</h2>
          {!loading && !error && (
            <span className='text-xs text-gray-400'>Rain precipitation ▾</span>
          )}
        </div>

        {loading && (
          <div className='animate-pulse mt-4'>
            <div className='h-6 w-32 bg-gray-200 rounded mb-3' />
            <div className='h-28 w-full bg-gray-100 rounded' />
          </div>
        )}

        {error && <div className='mt-4 text-sm text-red-600'>{error}</div>}

        {!loading && !error && forecast && forecast?.length > 0 && (
          <div className='mt-4'>
            <ForecastChart data={forecast} />
          </div>
        )}
      </div>
    </div>
  );
}
