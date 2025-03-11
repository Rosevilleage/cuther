import {queryOptions} from '@tanstack/react-query';
import {getFcstWeather, getNcstWeather} from '../api/WeatherApi';
import {WeatherFcstItemDTO, VilageFcstCategory} from '../model/weatherDTO';
import {
  ncstDTOToCurrentWeather,
  vilageFcstDTOToWeathers,
} from '../model/weatherMapper';
import {getSunRiseSet} from '../api/riseApi';

import {RiseSetData} from '../model/riseDTO';

interface WeatherQueryParams {
  base_date: string;
  base_time: string;
  nx: number;
  ny: number;
}

export const hourlyQueryOption = (hourlyWeatherParams: WeatherQueryParams) => {
  return queryOptions({
    queryKey: [
      'weather',
      'hourly',
      'list',
      hourlyWeatherParams.nx,
      hourlyWeatherParams.ny,
    ],
    queryFn: () =>
      getFcstWeather<WeatherFcstItemDTO<VilageFcstCategory>>(
        '/getVilageFcst',
        hourlyWeatherParams,
      ).then(res => res.data.response),
    select(data) {
      console.log(data);

      if (data.header.resultCode !== '00') {
        throw new Error(`api error: ${data.header.resultMsg}`);
      }

      return vilageFcstDTOToWeathers(data.body.items.item);
    },
    enabled: hourlyWeatherParams.nx !== 0 && hourlyWeatherParams.ny !== 0,
  });
};

export const nowWeatherQueryOption = (nowWeatherParams: WeatherQueryParams) => {
  return queryOptions({
    queryKey: [
      'weather',
      'today',
      'now',
      nowWeatherParams.nx,
      nowWeatherParams.ny,
    ],
    queryFn: () =>
      getNcstWeather(nowWeatherParams).then(res => res.data.response),
    staleTime: 0,
    select(data) {
      if (data.header.resultCode !== '00') {
        throw new Error(`api error: ${data.header.resultMsg}`);
      }
      return ncstDTOToCurrentWeather(data.body.items.item);
    },
    enabled: nowWeatherParams.nx !== 0 && nowWeatherParams.ny !== 0,
  });
};

export const sunRiseSetQueryOption = (
  base_date: string,
  lat: number,
  lng: number,
) => {
  return queryOptions({
    queryKey: ['sunRiseSet', base_date, lat, lng],
    queryFn: (): Promise<RiseSetData> =>
      getSunRiseSet(base_date, lat, lng).then(res => res.data.response),
    select(data): [string, string] {
      if (data.header.resultCode !== '00') {
        throw new Error(`api error: ${data.header.resultMsg}`);
      }
      return [
        data.body.items.item.sunrise.trim(),
        data.body.items.item.sunset.trim(),
      ];
    },
    enabled: lat !== 0 && lng !== 0,
  });
};
