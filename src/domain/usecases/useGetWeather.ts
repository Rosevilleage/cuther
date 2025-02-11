import {useState} from 'react';
import {WeatherRepositoryImpl} from '../../data/repositories/WeatherRepository';

export const useGetWeather = () => {
  const [weather, setWeather] = useState(null);
  const repository = new WeatherRepositoryImpl();

  const fetchWeather = async () => {
    const data = await repository.getWeathers();
    // setWeather(data);
  };

  // useEffect(() => {
  //   fetchWeather();
  // }, []);

  return {weather, fetchWeather};
};
