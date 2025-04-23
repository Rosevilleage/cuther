import axios from 'axios';
import Config from 'react-native-config';
import {GeoLocationResponse} from '../model/geoLocationDTO';
console.log(Config.REVERSE_GEO_KEY_ID, Config.REVERSE_GEO_KEY);

const reGeoFetcher = axios.create({
  baseURL: Config.REVERSE_GOE_URL,
  timeout: 5000,
  headers: {
    'x-ncp-apigw-api-key-id': Config.REVERSE_GEO_KEY_ID,
    'x-ncp-apigw-api-key': Config.REVERSE_GEO_KEY,
  },
});

reGeoFetcher.interceptors.request.use(req => {
  if (process.env.NODE_ENV === 'development') {
    console.log('reGeoReq :', req);
  }
  return req;
});

reGeoFetcher.interceptors.response.use(
  res => {
    if (process.env.NODE_ENV === 'development') {
      console.log('reGeoRes :', res);
    }
    return res;
  },
  error => {
    if (process.env.NODE_ENV === 'development') {
      console.log('reGeoError :', error);
    }

    return Promise.reject(error);
  },
);

export function getGeoLocation(x: number, y: number) {
  const params = {
    coords: `${y},${x}`,
    orders: 'legalcode',
    output: 'json',
  };
  return reGeoFetcher.get<GeoLocationResponse>('', {params});
}
