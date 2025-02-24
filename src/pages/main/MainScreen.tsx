import React from 'react';
import {ScrollView, useWindowDimensions} from 'react-native';

import CurrentDisplay from '../../widgets/CurrentDisplay';
import {useWeatherStore} from '../../features/weather/model/weatherStore';

export default function MainScreen() {
  const {width, height} = useWindowDimensions();
  const {currentWeather, sunRiseSet, weathers} = useWeatherStore();

  const firstDate = Object.keys(weathers)[0];
  const firstTime = Object.keys(weathers[firstDate])[0];
  return (
    <ScrollView style={{width, height}}>
      {/* currentDisplay */}
      <CurrentDisplay
        currentWeather={currentWeather}
        sunRiseSet={sunRiseSet}
        condition={weathers[firstDate][firstTime].condition}
      />
      {/* 단기 */}
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   container: {},
// });
