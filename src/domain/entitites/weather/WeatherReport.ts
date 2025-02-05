import {HourlyWeather} from './HourlyWeather';
import {Weather} from './Weather';

export class WeatherReport {
  constructor(
    public currentWeather: Weather,
    public hourlyWeather: HourlyWeather[],
  ) {}
}
