import axios from 'axios';

const reGeoFetcher = axios.create({
  baseURL: process.env.REVERSE_GOE_URL,
  timeout: 10000,
  headers: {
    'x-ncp-apigw-api-key-id': process.env.REVERSE_GEO_KEY_ID,
    'x-ncp-apigw-api-key': process.env.REVERSE_GEO_KEY,
  },
});
reGeoFetcher.interceptors.request.use(req => {
  console.log('geoReq :', req);

  return req;
});
reGeoFetcher.interceptors.response.use(res => {
  console.log('geoRes :', res.status);
  return res;
});

export function getPlaceName(x: number, y: number) {
  const params = {
    coords: `${y},${x}`,
    orders: 'legalcode',
    output: 'json',
  };
  return reGeoFetcher.get<PlaceResponse>('', {params});
}
