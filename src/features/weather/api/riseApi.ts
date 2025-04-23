import axios from 'axios';
import {RiseResponse} from '../model/riseDTO';
import Config from 'react-native-config';

const riseFetcher = axios.create({
  baseURL: Config.RISE_INFO_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
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
    ServiceKey: Config.API_KEY,
  };
  return riseFetcher.get<RiseResponse>('/getLCRiseSetInfo', {params});
}
