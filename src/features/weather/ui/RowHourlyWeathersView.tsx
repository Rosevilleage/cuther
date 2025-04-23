import React from 'react';
import {Weather} from '../../../entities/Weather';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import WeatherConditionRenderer from './WeatherConditionRenderer';
import {
  responsiveFontSize,
  responsivePixel,
} from '../../../app/style/responsivePixel';
const CELSIUS = '℃';

interface RowHourlyWeathersViewProps {
  hourlyWeathers: Weather[];
  sunRiseSet: [string, string];
  day: string;
}

const RowHourlyWeathersView: React.FC<RowHourlyWeathersViewProps> = ({
  hourlyWeathers,
  sunRiseSet,
  day,
}) => {
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
            size={responsivePixel(30)}
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
};

export default RowHourlyWeathersView;

const styles = StyleSheet.create({
  scrollItemText: {
    fontSize: responsiveFontSize(16),
  },
});
