import axios from 'axios';
import {RiseResponse} from '../model/riseDTO';

const riseFetcher = axios.create({
  baseURL: process.env.RISE_INFO_URL as string,
  timeout: 10000,
});

export function getSunRiseSet(
  locdate: string,
  latitude: number,
  longitude: number,
) {
  const params = {
    locdate,
    latitude,
    longitude,
    dnYn: 'Y',
    ServiceKey: process.env.API_KEY as string,
  };
  return riseFetcher.get<RiseResponse>('/getLCRiseSetInfo', {params});
}
