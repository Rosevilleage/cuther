import {reGeoFetcher, wetherFetcher} from './apiClient';

export function getWetherData(
  endPoint: string,
  {
    nx,
    ny,
    base_date,
    base_time,
  }: {
    nx: number;
    ny: number;
    base_date: string;
    base_time: string;
  },
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
  return wetherFetcher.get(endPoint, {params});
}

export function getPlaceName(x: number, y: number) {
  const params = {
    coords: `${y},${x}`,
    orders: 'legalcode',
    output: 'json',
  };
  return reGeoFetcher.get('', {params});
}
