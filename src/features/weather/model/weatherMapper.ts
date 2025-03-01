import {CurWeather, Weather, DailyWeathers} from '../../../entitites/Weather';
import {calculatePerceivedTemperature} from '../lib/weatherUtil';
import {UltraNcstItem, VilageFcstItem} from './weatherDTO';

export function ncstDTOToCurrentWeather(
  weathersDTO: UltraNcstItem[],
): CurWeather {
  const result: CurWeather = {
    temperature: 0,
    perceivedTemperature: 0,
    windDirection: '',
    windSpeed: 0,
    rainWeight: 0,
    rain: 0,
    humidity: 0,
  };
  weathersDTO.forEach(({category, obsrValue}) => {
    switch (category) {
      case 'T1H':
        result.temperature = +obsrValue;
        break;
      case 'RN1':
        result.rainWeight = +obsrValue;
        break;
      case 'REH':
        result.humidity = +obsrValue;
        break;
      case 'PTY':
        result.rain = +obsrValue;
        break;
      case 'VEC':
        result.windDirection = obsrValue;
        break;
      case 'WSD':
        result.windSpeed = +obsrValue;
        break;
    }
  });
  result.perceivedTemperature = calculatePerceivedTemperature(
    result.temperature,
    result.windSpeed,
    result.humidity,
  );
  return result;
}

export function vilageFcstDTOToWeathers(weathersDTO: VilageFcstItem[]) {
  console.log(weathersDTO);
  let result: DailyWeathers = {};
  weathersDTO.forEach(({category, fcstDate, fcstTime, fcstValue}) => {
    if (!result[fcstDate]) {
      result[fcstDate] = {min: undefined, max: undefined, weathers: []};
    }
    const weather = result[fcstDate].weathers.find(
      item => item.time === fcstTime,
    );
    if (!weather) {
      result[fcstDate].weathers.push(
        new Weather(fcstTime, 0, 1, 0, '', 0, 0, 0, 0, 0, 0),
      );
    } else {
      switch (category) {
        case 'POP':
          weather.rainPercent = +fcstValue;
          break;
        case 'PTY':
          weather.rain = +fcstValue;
          break;
        case 'PCP':
          weather.rainWeight = +fcstValue;
          break;
        case 'REH':
          weather.humidity = +fcstValue;
          break;
        case 'SNO':
          weather.snowWeitgh = +fcstValue;
          break;
        case 'TMP':
          weather.temperature = +fcstValue;
          break;
        case 'TMN':
          result[fcstDate].min = +fcstValue;
          break;
        case 'TMX':
          result[fcstDate].max = +fcstValue;
          break;
        case 'VEC':
          weather.windDirection = fcstValue;
          break;
        case 'WSD':
          weather.windSpeed = +fcstValue;
          break;
        case 'SKY':
          weather.condition = +fcstValue;
          break;
      }
    }
  });
  Object.values(result).forEach(({weathers}) => {
    weathers.forEach(weather => {
      weather.perceivedTemperature = calculatePerceivedTemperature(
        weather.temperature,
        weather.windSpeed,
        weather.humidity,
      );
    });
  });
  return result;
}
