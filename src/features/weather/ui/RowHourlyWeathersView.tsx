import React from 'react';
import {Weather} from '../../../entitites/Weather';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import WeatherConditionRenderer from './WeatherConditionRenderer';
const CELSIUS = '℃';

function RowHourlyWeathersView({
  hourlyWeathers,
  sunRiseSet,
  day,
}: {
  hourlyWeathers: Weather[];
  sunRiseSet: [string, string];
  day: string;
}) {
  const [sunRise, sunSet] = sunRiseSet;
  return (
    <FlatList
      data={hourlyWeathers}
      horizontal
      contentContainerStyle={{gap: 28}}
      renderItem={({item: weather}) => (
        <View
          key={`${day}${weather.time}`}
          style={{gap: 10, alignItems: 'center'}}>
          <Text style={styles.scrollItemText}>
            {weather.time.substring(0, 2)}시
          </Text>
          <WeatherConditionRenderer
            condition={weather.condition}
            rain={weather.rain}
            light={+weather.time >= +sunRise && +weather.time < +sunSet}
            size={30}
          />
          <Text style={styles.scrollItemText}>
            {weather.temperature}
            {CELSIUS}
          </Text>
        </View>
      )}
      showsHorizontalScrollIndicator={false}
    />
  );
}

export default RowHourlyWeathersView;

const styles = StyleSheet.create({
  scrollItemText: {
    fontSize: 16,
  },
});
