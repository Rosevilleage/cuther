import {queryOptions} from '@tanstack/react-query';
import {
  getFcstWeather,
  getMidConditions,
  getMidTemplate,
  getNcstWeather,
} from '../api/WeatherApi';
import {
  WeatherFcstItemDTO,
  VilageFcstCategory,
  MidCondition,
  WeatherDTO,
} from '../model/weatherDTO';
import {
  ncstDTOToCurrentWeather,
  vilageFcstDTOToWeathers,
} from '../model/weatherMapper';
import {getSunRiseSet} from '../api/riseApi';
import {RegId} from '../../geoLocation/model/geoLocationStore';
import dayjs from 'dayjs';
import {getMidWeatherStatus} from './weatherUtil';
import {MidTaRegId} from '../../geoLocation/lib/geoLocationUtils';
import {parseXml, WeatherXMLToJSONResponse} from '../../../app/lib/errorUtils';
import {AxiosResponse} from 'axios';
import {RiseResponse} from '../model/riseDTO';
// import {getErrorMessage} from '../../../app/lib/errorUtils';

interface WeatherQueryParams {
  base_date: string;
  base_time: string;
  nx: number;
  ny: number;
}

function getWeatherApiError(
  dto: AxiosResponse<RiseResponse, any>,
  apiName: string,
): void;
function getWeatherApiError(
  dto: AxiosResponse<WeatherDTO<any>, any>,
  apiName: string,
): void;
function getWeatherApiError(
  dto: AxiosResponse<WeatherDTO<any> | RiseResponse, any>,
  apiName: string,
): void {
  if (dto.data.response?.header.resultCode !== '00') {
    const dtoWithHeaders = dto as AxiosResponse<
      WeatherDTO<any> | RiseResponse,
      any
    > & {
      headers: {'content-type': string};
      data: string;
    };
    if (
      // 에러 응답이 xml로 오는 경우
      'headers' in dto &&
      'data' in dto &&
      dto.headers['content-type'] === 'text/xml;charset=UTF-8'
    ) {
      const {
        OpenAPI_ServiceResponse: {
          cmmMsgHeader: {returnAuthMsg, returnReasonCode},
        },
      } = parseXml(dtoWithHeaders.data) as WeatherXMLToJSONResponse;

      if (process.env.NODE_ENV === 'development') {
        console.log(
          `${apiName} 에러 발생 :`,
          `${returnReasonCode} ${returnAuthMsg}`,
        );
      }
      throw new Error(`${returnReasonCode} ${returnAuthMsg}`);
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.log(
          `${apiName} 에러 발생 :`,
          `${dto.data.response?.header.resultCode} ${dto.data.response?.header.resultMsg}`,
        );
      }
      throw new Error(
        `${dto.data.response?.header.resultCode} ${dto.data.response?.header.resultMsg}`,
      );
    }
  }
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
      ).then(res => {
        getWeatherApiError(res, 'hourly');
        return res.data.response.body.items.item;
      }),
    select: vilageFcstDTOToWeathers,
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
      getNcstWeather(nowWeatherParams).then(res => {
        getWeatherApiError(res, 'now');
        return res.data.response.body.items.item;
      }),
    staleTime: 0,
    select: ncstDTOToCurrentWeather,
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
    queryFn: () =>
      getSunRiseSet(base_date, lat, lng).then(res => {
        getWeatherApiError(res, 'sunRiseSet');
        return res.data.response?.body.items.item;
      }),
    select(data): [string, string] {
      return [data.sunrise.trim(), data.sunset.trim()];
    },
    enabled: lat !== 0 && lng !== 0,
  });
};

export const dailyConditionQueryOption = (regId: RegId, tmFc: string) => {
  return queryOptions({
    queryKey: ['weather', 'daily', 'condition', regId],
    queryFn: () =>
      getMidConditions(regId, tmFc).then(res => {
        getWeatherApiError(res, 'dailyCondition');
        return res.data.response?.body.items.item;
      }),
    select(data) {
      const result: {
        date: string;
        amCon: string;
        pmCon: string;
      }[] = [];
      const date = dayjs(tmFc.substring(0, 8));
      const item = data[0];
      Object.entries(item).forEach(([category, value]) => {
        if (category === 'regId') {
          return;
        }
        const num = category.match(/\d+/g);
        if (num) {
          const targetDate = date.add(+num[0], 'day').format('YYYYMMDD');
          if (!getTargetItem(result, targetDate)) {
            result.push({date: targetDate, amCon: '', pmCon: ''});
          }
          const targetWeather = getTargetItem(result, targetDate);
          const [propType, AmPm] = category.split(/\d+/);
          const condition = getMidWeatherStatus(value as MidCondition);
          if (propType === 'wf') {
            if (+num[0] > 7) {
              targetWeather.amCon = condition;
              targetWeather.pmCon = condition;
            }
            if (AmPm === 'Am') {
              targetWeather.amCon = condition;
            } else {
              targetWeather.pmCon = condition;
            }
          }
        }
      });
      return result;
    },
    enabled: !!regId,
  });
};

export const dailyTemperatureQueryOption = (
  midTaRegId: MidTaRegId,
  tmFc: string,
) => {
  return queryOptions({
    queryKey: ['weather', 'daily', 'template', midTaRegId],
    queryFn: () => {
      return getMidTemplate(midTaRegId, tmFc).then(res => {
        getWeatherApiError(res, 'dailyTemperature');
        return res.data.response?.body.items.item;
      });
    },
    select(data) {
      const result: {
        date: string;
        min: number;
        max: number;
      }[] = [];
      const date = dayjs(tmFc.substring(0, 8));
      const item = data[0];

      Object.entries(item).forEach(([category, value]) => {
        if (category === 'regId') {
          return;
        }
        const num = category.match(/\d+/g);
        if (num) {
          const targetDate = date.add(+num[0], 'day').format('YYYYMMDD');
          if (!getTargetItem(result, targetDate)) {
            result.push({
              date: targetDate,
              min: Number.MIN_SAFE_INTEGER,
              max: Number.MAX_SAFE_INTEGER,
            });
          }

          const targetWeather = getTargetItem(result, targetDate);

          const [propType, option] = category.split(/\d+/);

          if (propType === 'taMax' && option === '') {
            targetWeather.max = +value;
          } else if (propType === 'taMin' && option === '') {
            targetWeather.min = +value;
          }
        }
      });
      return result;
    },
    enabled: !!midTaRegId,
  });
};

function getTargetItem<T extends {date: string}>(
  dictionary: T[],
  targetDate: string,
): T {
  return dictionary.find(weather => weather.date === targetDate) as T;
}
