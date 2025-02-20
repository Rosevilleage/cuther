import axios from 'axios';
import {WeatherDTO, WeatherNcstItemDTO} from '../model/weatherDTO';

const weatherFetcher = axios.create({
  baseURL: process.env.API_END_POINT as string,
  timeout: 10000,
});

weatherFetcher.interceptors.request.use(req => {
  // console.log('wetherReq :', req);
  return req;
});

weatherFetcher.interceptors.response.use(res => {
  // console.log('wetherRes :', res);
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
    numOfRows: 1000,
    pageNo: 1,
    dataType: 'JSON',
    base_date,
    base_time,
    nx,
    ny,
  };
  return weatherFetcher.get<WeatherDTO<T>>(url, {params});
}
