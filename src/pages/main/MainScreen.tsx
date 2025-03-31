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
import {roundToNearestBaseTime} from '../../features/weather/lib/weatherUtil';
import {BaseDate, BaseTime} from '../../features/weather/model/weatherDTO';
import SimpleReportView from '../../widgets/SimpleReportView';
import {
  preReportQueryOption,
  specialReportQueryOption,
} from '../../features/specialReport/lib/specialReportQueries';
import {DailyWeathers} from '../../entitites/Weather';
import {MidTaRegId} from '../../features/geoLocation/lib/geoLocationUtils';
import SwipeableWeatherContainer from '../../widgets/SwipeableWeatherContainer';

export default function MainScreen() {
  const {nx, ny, lat, lng, regId, midTaRegId, stnId} = useGeoLocation();
  const base_date = dayjs().format('YYYYMMDD') as BaseDate;
  const base_time = dayjs().format('HHmm') as BaseTime;
  const hourlyDate = roundToNearestBaseTime(base_date, base_time);

  const {width, height} = useWindowDimensions();

  const {
    data: currentWeather,
    // isError: isNowWeatherError,
    // isLoading: isNowWeatherLoading,
  } = useQuery(nowWeatherQueryOption({base_date, base_time, nx, ny}));
  const {
    data: hourlyWeathers,
    // isError: isHourlyWeatherError,
    // isLoading: isHourlyWeatherLoisLoading,
  } = useQuery(
    hourlyQueryOption({
      base_date: hourlyDate.baseDate,
      base_time: hourlyDate.baseTime,
      nx,
      ny,
    }),
  );
  const {
    data: sunRiseSet,
    // isError: isRiseSetError,
    // isLoading: isRiseSetLoisLoading,
  } = useQuery(sunRiseSetQueryOption(base_date, lat, lng));
  const tmFc =
    +base_time < 610
      ? `${dayjs(base_date).subtract(1, 'days').format('YYYYMMDD')}1800`
      : +base_time < 1810
      ? `${base_date}0600`
      : `${base_date}1800`;
  const {
    data: dailyConditions,
    // isError: dailyWeatherIsError,
    // isLoading: dailyWeatherIsLoading,
  } = useQuery(dailyConditionQueryOption(regId as RegId, tmFc));

  const {data: dailyTemperature} = useQuery(
    dailyTemperatureQueryOption(midTaRegId as MidTaRegId, tmFc),
  );

  const dailyWeathers: DailyWeathers[] | undefined =
    dailyConditions && dailyTemperature
      ? dailyConditions.map((conditions, i) => {
          return {
            ...conditions,
            ...dailyTemperature[i],
          };
        })
      : undefined;

  const {data: sepcialReports} = useQuery(
    specialReportQueryOption(stnId as number),
  );
  const {data: preReports} = useQuery(preReportQueryOption(stnId as number));
  return (
    <ScrollView style={{width, height}}>
      <View style={{flex: 1, padding: 10, gap: 15}}>
        {/* 날씨 표시 */}
        {currentWeather && sunRiseSet && hourlyWeathers && (
          <SwipeableWeatherContainer
            currentWeather={currentWeather}
            hourlyWeathers={hourlyWeathers}
            sunRiseSet={sunRiseSet}
          />
        )}
        {/* 시간별 날씨 */}
        {hourlyWeathers && sunRiseSet && (
          <TodayHourlyWeathers
            weathers={hourlyWeathers}
            sunRiseSet={sunRiseSet}
          />
        )}
        {/* 특보 */}
        {sepcialReports && preReports && (
          <SimpleReportView
            specialReports={sepcialReports}
            preReports={preReports}
          />
        )}
        {/* 단기 */}
        {hourlyWeathers && sunRiseSet && dailyWeathers && (
          <WeatherList
            hourlyWeathers={hourlyWeathers}
            dailyWeathers={dailyWeathers}
            sunRiseSet={sunRiseSet}
          />
        )}
      </View>
    </ScrollView>
  );
}
