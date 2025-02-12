import axios from 'axios';

const weatherFetcher = axios.create({
  baseURL: process.env.API_END_POINT as string,
  timeout: 5000,
});

weatherFetcher.interceptors.request.use(req => {
  console.log('wetherReq :', req);
  return req;
});

weatherFetcher.interceptors.response.use(res => {
  console.log('wetherRes :', res.status);
  return res;
});

export class WeatherApi {
  private api = weatherFetcher;

  async fetchWeather(
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
    return this.api.get(endPoint, {params});
  }
}
