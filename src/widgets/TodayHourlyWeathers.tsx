import React from 'react';
import {Text, View} from 'react-native';
import RowHourlyWeathersView from '../features/weather/ui/RowHourlyWeathersView';
import {DailyWeathers} from '../entitites/Weather';

function TodayHourlyWeathers({
  weathers,
  sunRiseSet,
}: {
  weathers: DailyWeathers;
  sunRiseSet: [string, string];
}) {
  const weatherInfo = Object.entries(weathers);

  if (!weatherInfo.length) {
    return null;
  }
  const [day, {weathers: hourlyWeathers}] = weatherInfo[0];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 15,
        paddingInline: 20,
        paddingBlock: 10,
        borderRadius: 15,
        gap: 20,
      }}>
      <Text style={{textAlign: 'center', fontSize: 23}}>시간별 날씨</Text>
      <RowHourlyWeathersView
        hourlyWeathers={hourlyWeathers}
        sunRiseSet={sunRiseSet}
        day={day}
      />
    </View>
  );
}

export default TodayHourlyWeathers;
