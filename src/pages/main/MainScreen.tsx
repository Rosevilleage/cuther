import React from 'react';
import {ScrollView, useWindowDimensions, View} from 'react-native';

import CurrentDisplay from '../../widgets/CurrentDisplay';
import WeatherList from '../../widgets/WeatherList';
import TodayHourlyWeathers from '../../widgets/TodayHourlyWeathers';
import SimpleReportView from '../../widgets/SimpleReportView';
import {useQuery} from '@tanstack/react-query';
import {
  hourlyQueryOption,
  nowWeatherQueryOption,
  sunRiseSetQueryOption,
} from '../../features/weather/lib/weatherQueries';
import {useGeoLocation} from '../../features/geoLocation/model/geoLocationStore';
import dayjs from 'dayjs';
import {roundToNearestBaseTime} from '../../features/weather/lib/weatherUtil';
import {BaseDate, BaseTime} from '../../features/weather/model/weatherDTO';

export default function MainScreen() {
  const {nx, ny, lat, lng} = useGeoLocation();
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
    data: dailyWeathers,
    // isError: isDailyWeatherError,
    // isLoading: isDailyWeatherLoisLoading,
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

  return (
    <ScrollView style={{width, height}}>
      <View style={{flex: 1, padding: 10, gap: 15}}>
        {/* currentDisplay */}
        {currentWeather && sunRiseSet && (
          <CurrentDisplay
            currentWeather={currentWeather}
            sunRiseSet={sunRiseSet}
            condition={
              dailyWeathers && Object.keys(dailyWeathers)[0]
                ? dailyWeathers[Object.keys(dailyWeathers)[0]].weathers[0]
                    .condition
                : 1
            }
          />
        )}
        {/* 시간별 날씨 */}
        {dailyWeathers && sunRiseSet && (
          <TodayHourlyWeathers
            weathers={dailyWeathers}
            sunRiseSet={sunRiseSet}
          />
        )}
        {/* 특보 */}
        <SimpleReportView />
        {/* 단기 */}
        {dailyWeathers && sunRiseSet && (
          <WeatherList weathers={dailyWeathers} sunRiseSet={sunRiseSet} />
        )}
      </View>
    </ScrollView>
  );
}
