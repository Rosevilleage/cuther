import {WeatherReport} from '../entitites/weather/WeatherReport';

export interface IWeatherRepository {
  getWeathers(): Promise<WeatherReport>;
}
