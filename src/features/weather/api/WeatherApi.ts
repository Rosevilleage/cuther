import axios from 'axios';
import Config from 'react-native-config';
import {
  MidLandFcstDTO,
  MidTaDTO,
  WeatherDTO,
  WeatherNcstItemDTO,
} from '../model/weatherDTO';

const weatherFetcher = axios.create({
  baseURL: Config.API_END_POINT,
  timeout: 5000,
});

const midWeatherFetcher = axios.create({
  baseURL: Config.MID_WEATHER_URL,
  timeout: 10000,
});

weatherFetcher.interceptors.request.use(req => {
  return req;
});

weatherFetcher.interceptors.response.use(res => {
  if (process.env.NODE_ENV === 'development') {
    console.log('wetherRes :', res);
  }
  return res;
});

interface WeatherApiProps {
  nx: number;
  ny: number;
  base_date: string;
  base_time: string;
}
export function getNcstWeather({
  nx,
  ny,
  base_date,
  base_time,
}: WeatherApiProps) {
  const params = {
    serviceKey: Config.API_KEY,
    numOfRows: 5000,
    pageNo: 1,
    dataType: 'JSON',
    base_date,
    base_time,
    nx,
    ny,
  };
  if (process.env.NODE_ENV === 'development') {
    console.log('nowWeatherReq :', params);
  }
  return weatherFetcher.get<WeatherDTO<WeatherNcstItemDTO>>(
    '/getUltraSrtNcst',
    {params},
  );
}

export function getFcstWeather<T>(
  url: string,
  {base_date, base_time, nx, ny}: WeatherApiProps,
) {
  const params = {
    serviceKey: Config.API_KEY,
    numOfRows: 5000,
    pageNo: 1,
    dataType: 'JSON',
    base_date,
    base_time,
    nx,
    ny,
  };
  if (process.env.NODE_ENV === 'development') {
    console.log('hourlyWeatherReq :', params);
  }
  return weatherFetcher.get<WeatherDTO<T>>(url, {params});
}

export function getMidConditions(regId: string, tmFc: string) {
  const url = '/getMidLandFcst';
  const params = {
    serviceKey: Config.API_KEY,
    numOfRows: 1000,
    pageNo: 1,
    dataType: 'JSON',
    regId,
    tmFc,
  };
  if (process.env.NODE_ENV === 'development') {
    console.log('midConditionsReq :', params);
  }
  return midWeatherFetcher.get<MidLandFcstDTO>(url, {params});
}

export function getMidTemplate(regId: string, tmFc: string) {
  const url = '/getMidTa';
  const params = {
    serviceKey: Config.API_KEY,
    numOfRows: 1000,
    pageNo: 1,
    dataType: 'JSON',
    regId,
    tmFc,
  };
  if (process.env.NODE_ENV === 'development') {
    console.log('midTemplateReq :', params);
  }
  return midWeatherFetcher.get<MidTaDTO>(url, {params});
}
