import React from 'react';
import {ScrollView, useWindowDimensions} from 'react-native';

import CurrentDisplay from '../../widgets/CurrentDisplay';
import {useWeatherStore} from '../../features/weather/model/weatherStore';
import WeatherList from '../../widgets/WeatherList';

export default function MainScreen() {
  const {width, height} = useWindowDimensions();
  const {currentWeather, sunRiseSet, weathers} = useWeatherStore();

  const firstDate = Object.keys(weathers)[0];
  return (
    <ScrollView style={{width, height}}>
      {/* currentDisplay */}
      <CurrentDisplay
        currentWeather={currentWeather}
        sunRiseSet={sunRiseSet}
        condition={weathers && firstDate ? weathers[firstDate][0].condition : 1}
      />
      {/* 단기 */}
      <WeatherList weathers={weathers} sunRiseSet={sunRiseSet} />
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   container: {},
// });
