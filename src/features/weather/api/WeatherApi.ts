import axios from 'axios';
import {
  MidLandFcstDTO,
  MidTaDTO,
  WeatherDTO,
  WeatherNcstItemDTO,
} from '../model/weatherDTO';

const weatherFetcher = axios.create({
  baseURL: process.env.API_END_POINT as string,
  timeout: 10000,
});

const midWeatherFetcher = axios.create({
  baseURL: process.env.MID_WEATHER_URL as string,
  timeout: 10000,
});

weatherFetcher.interceptors.request.use(req => {
  if (process.env.NODE_ENV === 'development') {
    console.log('wetherReq :', req);
  }
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
    serviceKey: process.env.API_KEY as string,
    numOfRows: 5000,
    pageNo: 1,
    dataType: 'JSON',
    base_date,
    base_time,
    nx,
    ny,
  };
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
    serviceKey: process.env.API_KEY as string,
    numOfRows: 5000,
    pageNo: 1,
    dataType: 'JSON',
    base_date,
    base_time,
    nx,
    ny,
  };
  return weatherFetcher.get<WeatherDTO<T>>(url, {params});
}

export function getMidConditions(regId: string, tmFc: string) {
  const url = '/getMidLandFcst';
  const params = {
    serviceKey: process.env.API_KEY as string,
    numOfRows: 1000,
    pageNo: 1,
    dataType: 'JSON',
    regId,
    tmFc,
  };
  return midWeatherFetcher.get<MidLandFcstDTO>(url, {params});
}

export function getMidTemplate(regId: string, tmFc: string) {
  const url = '/getMidTa';
  const params = {
    serviceKey: process.env.API_KEY as string,
    numOfRows: 1000,
    pageNo: 1,
    dataType: 'JSON',
    regId,
    tmFc,
  };
  return midWeatherFetcher.get<MidTaDTO>(url, {params});
}
