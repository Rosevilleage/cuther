<<<<<<< HEAD
import {WeatherReport} from '../entitites/weather/WeatherReport';
=======
import {WeatherReport} from '../entitites/Weather';
>>>>>>> fa6ae70 (WeatherRepositories.ts 변경 사항 저장)

export interface IWeatherRepository {
  getWeathers(): Promise<WeatherReport>;
}
