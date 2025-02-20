import dayjs from 'dayjs';
import {BaseDate, BaseTime} from '../model/weatherDTO';
import {WEATHER_CONDITION_PATH} from '../constants';

const baseTimes = [
  '0200',
  '0500',
  '0800',
  '1100',
  '1400',
  '1700',
  '2000',
  '2300',
] as const;

export function roundToNearestBaseTime(
  baseDate: BaseDate,
  baseTime: BaseTime,
): {baseDate: BaseDate; baseTime: BaseTime} {
  if (!/^\d{8}$/.test(baseDate) || !/^\d{4}$/.test(baseTime)) {
    throw new Error(
      'Invalid date or time format. Expected formats: YYYYMMDD and HHMM',
    );
  }

  const hour = +baseTime.slice(0, 2) * 100;

  for (let i = baseTimes.length - 1; i >= 0; i--) {
    if (hour >= +baseTimes[i]) {
      return {baseDate, baseTime: baseTimes[i]};
    }
  }

  // 하루 전날 계산
  const prevDate = dayjs(baseDate, 'YYYYMMDD')
    .subtract(1, 'day')
    .format('YYYYMMDD') as BaseDate;

  return {baseDate: prevDate, baseTime: baseTimes[baseTimes.length - 1]};
}

export function calculatePerceivedTemperature(
  temp: number,
  windSpeed: number,
  humidity: number,
): number {
  // m/s를 km/h로 변환 (1 m/s = 3.6 km/h)
  const windSpeedKmh = windSpeed * 3.6;

  // 1. 바람이 강할 때(Wind Chill) 적용
  if (temp <= 10 && windSpeedKmh >= 4.8) {
    return +(
      13.12 +
      0.6215 * temp -
      11.37 * Math.pow(windSpeedKmh, 0.16) +
      0.3965 * temp * Math.pow(windSpeedKmh, 0.16)
    ).toFixed(1);
  }

  // 2. 더운 날씨에서 열지수(Heat Index) 적용
  if (temp >= 27 && humidity >= 40) {
    return +(
      -8.784695 +
      1.61139411 * temp +
      2.338549 * humidity -
      0.14611605 * temp * humidity -
      0.012308094 * temp ** 2 -
      0.016424828 * humidity ** 2 +
      0.002211732 * temp ** 2 * humidity +
      0.00072546 * temp * humidity ** 2 -
      0.000003582 * temp ** 2 * humidity ** 2
    ).toFixed(1);
  }

  // 기본적으로 실제 온도 반환
  return +temp.toFixed(1);
}

export function perceivedTemperatureToLevel(
  perceivedTemperature: number,
): 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 0 {
  if (perceivedTemperature >= 28) {
    return 1;
  }
  if (perceivedTemperature < 28 && perceivedTemperature >= 23) {
    return 2;
  }
  if (perceivedTemperature < 23 && perceivedTemperature >= 20) {
    return 3;
  }
  if (perceivedTemperature < 20 && perceivedTemperature >= 17) {
    return 4;
  }
  if (perceivedTemperature < 17 && perceivedTemperature >= 12) {
    return 5;
  }
  if (perceivedTemperature < 12 && perceivedTemperature >= 9) {
    return 6;
  }
  if (perceivedTemperature < 9 && perceivedTemperature >= 5) {
    return 7;
  }
  if (perceivedTemperature < 5) {
    return 8;
  }
  return 0;
}

function genWeatherStatus(condition: number, rain: number) {
  if (rain !== 0) {
    if (rain === 1 || rain === 5) {
      return 'rain';
    }
    if (rain === 2 || rain === 6) {
      return 'rainSnow';
    }
    if (rain === 3 || rain === 7) {
      return 'snow';
    }
  }
  if (condition === 1) {
    return 'clear';
  }
  if (condition === 3) {
    return 'littleCloud';
  }
  if (condition === 4) {
    return 'cloud';
  }
}

export function genWeatherCondition(
  condition: number,
  rain: number,
  light: boolean,
) {
  const status = genWeatherStatus(condition, rain);
  if (status === 'clear' || status === 'littleCloud') {
    return light
      ? status === 'clear'
        ? WEATHER_CONDITION_PATH.sun
        : WEATHER_CONDITION_PATH.sunCloud
      : status === 'clear'
      ? WEATHER_CONDITION_PATH.moon
      : WEATHER_CONDITION_PATH.moonCloud;
  }
  return WEATHER_CONDITION_PATH[status as keyof typeof WEATHER_CONDITION_PATH];
}
