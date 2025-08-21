import { useState, useCallback } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { useAppState } from '@/hooks/useAppState';
import { geocodingApiUrl } from '@/config/env';

interface Place {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

const SearchCities = () => {
  const { query, setQuery, setLocation, fetchForecast } = useAppState();
  const [suggestions, setSuggestions] = useState<Place[]>([]);

  const fetchSuggestions = useCallback(async (value: string) => {
    if (value.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const url = `${geocodingApiUrl}/search?name=${encodeURIComponent(
        value
      )}&country=DE&count=5`;
      const res = await axios.get(url);
      setSuggestions(res.data.results || []);
    } catch (e: unknown) {
      setSuggestions([]);
      throw e;
    }
  }, []);

  const handleSelect = (place: Place) => {
    setQuery(`${place.name}, ${place.country}`);
    setSuggestions([]);
    fetchForecast({ latitude: place.latitude, longitude: place.longitude });
    setLocation(`${place.name}, ${place.country}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    fetchSuggestions(val);
  };

  return (
    <div className='relative w-full'>
      <Input placeholder='Berlin, Germany' value={query} onChange={handleChange} className='w-full' />

      {suggestions.length > 0 && (
        <ul className='absolute left-0 right-0 mt-1 bg-white border border-gray-300 text-gray-600 text-xs rounded-md shadow-lg z-10 max-h-48 overflow-y-auto'>
          {suggestions.map((place, idx) => (
            <li
              key={idx}
              className='px-3 py-2 cursor-pointer hover:bg-gray-100'
              onClick={() => handleSelect(place)}
            >
              {place.name}, {place.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchCities;
