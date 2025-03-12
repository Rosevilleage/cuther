import React from 'react';
import {Text, View} from 'react-native';
import RowHourlyWeathersView from '../features/weather/ui/RowHourlyWeathersView';
import {HourlyWeathers} from '../entitites/Weather';

function TodayHourlyWeathers({
  weathers,
  sunRiseSet,
}: {
  weathers: HourlyWeathers;
  sunRiseSet: [string, string];
}) {
  const weatherInfo = Object.entries(weathers);

  if (!weatherInfo.length) {
    return null;
  }
  const [day, {weathers: hourlyWeathers}] = weatherInfo[0];
  const totalWeathers =
    hourlyWeathers.length < 24
      ? [
          ...hourlyWeathers,
          ...weatherInfo[1][1].weathers.slice(0, 24 - hourlyWeathers.length),
        ]
      : hourlyWeathers;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingInline: 20,
        paddingBlock: 10,
        borderRadius: 15,
        gap: 20,
      }}>
      <Text style={{textAlign: 'center', fontSize: 23}}>시간별 날씨</Text>
      <RowHourlyWeathersView
        hourlyWeathers={totalWeathers}
        sunRiseSet={sunRiseSet}
        day={day}
      />
    </View>
  );
}

export default TodayHourlyWeathers;
