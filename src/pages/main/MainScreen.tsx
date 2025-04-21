import React from 'react';
import {ScrollView, useWindowDimensions, View} from 'react-native';

import WeatherList from '../../widgets/WeatherList';
import TodayHourlyWeathers from '../../widgets/TodayHourlyWeathers';

import {useQuery} from '@tanstack/react-query';
import {
  dailyConditionQueryOption,
  dailyTemperatureQueryOption,
  hourlyQueryOption,
  nowWeatherQueryOption,
  sunRiseSetQueryOption,
} from '../../features/weather/lib/weatherQueries';
import {
  RegId,
  useGeoLocation,
} from '../../features/geoLocation/model/geoLocationStore';
import dayjs from 'dayjs';
import {
  getCurrentWeatherTime,
  roundToNearestBaseTime,
} from '../../features/weather/lib/weatherUtil';
import {BaseDate, BaseTime} from '../../features/weather/model/weatherDTO';
import SimpleReportView from '../../widgets/SimpleReportView';
import {
  preReportQueryOption,
  specialReportQueryOption,
} from '../../features/specialReport/lib/specialReportQueries';
import {DailyWeathers} from '../../entitites/Weather';
import {MidTaRegId} from '../../features/geoLocation/lib/geoLocationUtils';
import SwipeableWeatherContainer from '../../widgets/SwipeableWeatherContainer';

const INITIAL_SUNRISESET: [string, string] = ['0600', '1800'];

export default function MainScreen() {
  const {nx, ny, lat, lng, regId, midTaRegId, stnId} = useGeoLocation();
  const base_date = dayjs().format('YYYYMMDD') as BaseDate;
  const base_time = dayjs().format('HHmm') as BaseTime;
  const hourlyDate = roundToNearestBaseTime(base_date, base_time);
  const {width, height} = useWindowDimensions();
  const nowDate = getCurrentWeatherTime(base_time, base_date);
  const {data: currentWeather, isLoading: isNowWeatherLoading} = useQuery(
    nowWeatherQueryOption({
      base_date: nowDate.baseDate,
      base_time: nowDate.baseTime,
      nx,
      ny,
    }),
  );
  const {data: hourlyWeathers, isLoading: isHourlyWeatherLoading} = useQuery(
    hourlyQueryOption({
      base_date: hourlyDate.baseDate,
      base_time: hourlyDate.baseTime,
      nx,
      ny,
    }),
  );
  const {data: sunRiseSet, isLoading: isRiseSetLoading} = useQuery(
    sunRiseSetQueryOption(base_date, lat, lng),
  );
  const tmFc =
    +base_time < 610
      ? `${dayjs(base_date).subtract(1, 'days').format('YYYYMMDD')}1800`
      : +base_time < 1810
      ? `${base_date}0600`
      : `${base_date}1800`;
  const {data: dailyConditions, isLoading: isDailyConditionLoading} = useQuery(
    dailyConditionQueryOption(regId as RegId, tmFc),
  );

  const {data: dailyTemperature, isLoading: isDailyTemperatureLoading} =
    useQuery(dailyTemperatureQueryOption(midTaRegId as MidTaRegId, tmFc));

  const dailyWeathers: DailyWeathers[] | undefined =
    dailyConditions && dailyTemperature
      ? dailyConditions.map((conditions, i) => {
          return {
            ...conditions,
            ...dailyTemperature[i],
          };
        })
      : undefined;

  const {data: sepcialReports, isLoading: isSpecialReportLoading} = useQuery(
    specialReportQueryOption(stnId as number),
  );
  const {data: preReports, isLoading: isPreReportLoading} = useQuery(
    preReportQueryOption(stnId as number),
  );

  const isLoading =
    isNowWeatherLoading ||
    isHourlyWeatherLoading ||
    isRiseSetLoading ||
    isDailyConditionLoading ||
    isDailyTemperatureLoading ||
    isSpecialReportLoading ||
    isPreReportLoading;

  return (
    <ScrollView style={{width, height}}>
      <View style={{flex: 1, padding: 10, gap: 15}}>
        {/* 날씨 표시 */}
        <SwipeableWeatherContainer
          currentWeather={currentWeather || null}
          hourlyWeathers={hourlyWeathers || {}}
          sunRiseSet={sunRiseSet || INITIAL_SUNRISESET}
          isLoading={isLoading}
        />
        {/* 시간별 날씨 */}
        <TodayHourlyWeathers
          weathers={hourlyWeathers || {}}
          sunRiseSet={sunRiseSet || INITIAL_SUNRISESET}
          isLoading={isLoading}
        />
        {/* 특보 */}
        <SimpleReportView
          specialReports={sepcialReports || []}
          preReports={preReports || []}
          isLoading={isLoading}
        />
        {/* 단기 */}

        <WeatherList
          hourlyWeathers={hourlyWeathers || {}}
          dailyWeathers={dailyWeathers || []}
          sunRiseSet={sunRiseSet || INITIAL_SUNRISESET}
          isLoading={isLoading}
        />
      </View>
    </ScrollView>
  );
}
