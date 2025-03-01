import React from 'react';
import {ScrollView, useWindowDimensions} from 'react-native';

import CurrentDisplay from '../../widgets/CurrentDisplay';
import {useWeatherStore} from '../../features/weather/model/weatherStore';
import WeatherList from '../../widgets/WeatherList';
import TodayHourlyWeathers from '../../widgets/TodayHourlyWeathers';

export default function MainScreen() {
  const {width, height} = useWindowDimensions();
  const {currentWeather, sunRiseSet, dailyWeathers} = useWeatherStore();

  const firstDate = Object.keys(dailyWeathers)[0];
  return (
    <ScrollView style={{width, height, padding: 10}}>
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
      <TodayHourlyWeathers weathers={dailyWeathers} sunRiseSet={sunRiseSet} />
      {/* 단기 */}
      <WeatherList weathers={dailyWeathers} sunRiseSet={sunRiseSet} />
    </ScrollView>
  );
}
