import React from 'react';
import {ScrollView, useWindowDimensions, View} from 'react-native';

import CurrentDisplay from '../../widgets/CurrentDisplay';
import {useWeatherStore} from '../../features/weather/model/weatherStore';
import WeatherList from '../../widgets/WeatherList';
import TodayHourlyWeathers from '../../widgets/TodayHourlyWeathers';
import SimpleReportView from '../../widgets/SimpleReportView';

export default function MainScreen() {
  const {width, height} = useWindowDimensions();
  const {currentWeather, sunRiseSet, dailyWeathers} = useWeatherStore();

  const firstDate = Object.keys(dailyWeathers)[0];
  return (
    <ScrollView style={{width, height}}>
      <View style={{flex: 1, padding: 10, gap: 15}}>
        {/* currentDisplay */}
        <CurrentDisplay
          currentWeather={currentWeather}
          sunRiseSet={sunRiseSet}
          condition={
            dailyWeathers && firstDate
              ? dailyWeathers[firstDate].weathers[0].condition
              : 1
          }
        />
        {/* 시간별 날씨 */}
        <TodayHourlyWeathers weathers={dailyWeathers} sunRiseSet={sunRiseSet} />
        {/* 특보 */}
        <SimpleReportView />
        {/* 단기 */}
        <WeatherList weathers={dailyWeathers} sunRiseSet={sunRiseSet} />
      </View>
    </ScrollView>
  );
}
