import {CurWeather, Weather, Weathers} from '../../../entitites/Weather';
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
  let result: Weathers = {};
  weathersDTO.forEach(({category, fcstDate, fcstTime, fcstValue}) => {
    if (!result[fcstDate]) {
      result[fcstDate] = {};
    }
    if (!result[fcstDate][fcstTime]) {
      result[fcstDate][fcstTime] = new Weather(
        0,
        1,
        0,
        0,
        0,
        '',
        0,
        0,
        0,
        0,
        0,
        0,
      );
    }
    const weather = result[fcstDate][fcstTime];
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
        weather.min = +fcstValue;
        break;
      case 'TMX':
        weather.max = +fcstValue;
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
    weather.perceivedTemperature = calculatePerceivedTemperature(
      weather.temperature,
      weather.windSpeed,
      weather.humidity,
    );
  });
  return result;
}
