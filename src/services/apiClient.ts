import axios from 'axios';

const wetherFetcher = axios.create({
  baseURL: process.env.API_END_POINT as string,
  timeout: 5000,
});
wetherFetcher.interceptors.request.use(req => {
  console.log('wetherReq :', req);
  return req;
});
wetherFetcher.interceptors.response.use(res => {
  console.log('wetherRes :', res.status);
  return res;
});

const reGeoFetcher = axios.create({
  baseURL: process.env.REVERSE_GOE_URL,
  timeout: 5000,
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

export {wetherFetcher, reGeoFetcher};
