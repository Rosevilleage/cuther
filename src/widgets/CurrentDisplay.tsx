import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import CharactorRenderer from '../features/weather/ui/CharactorRenderer';
import {perceivedTemperatureToLevel} from '../features/weather/lib/weatherUtil';
import dayjs from 'dayjs';
import WeatherConditionRenderer from '../features/weather/ui/WeatherConditionRenderer';
import {usePlaceStore} from '../features/place/model/placeStore';
import {CurWeather} from '../entitites/Weather';

export default function CurrentDisplay({
  currentWeather,
  sunRiseSet,
  condition,
}: {
  currentWeather: CurWeather;
  sunRiseSet: [string, string];
  condition: number;
}) {
  const [sunRise, sunSet] = sunRiseSet;
  const perceivedTempLevel = perceivedTemperatureToLevel(
    currentWeather.perceivedTemperature,
  );
  const base_time = dayjs().format('HHmm');
  const place = usePlaceStore(state => state.place);
  return (
    <View style={styles.mainsection}>
      <View
        style={{
          height: 400,
          overflow: 'hidden',
        }}>
        <CharactorRenderer type={perceivedTempLevel} loop autoPlay />
      </View>
      <View style={styles.currentInfoContainer}>
        <View
          style={[
            styles.flexOne,
            {
              height: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <WeatherConditionRenderer
            condition={condition}
            rain={currentWeather.rain}
            light={+base_time >= +sunRise && +base_time <= +sunSet}
            size={60}
          />
          <View style={{flex: 1, justifyContent: 'center', marginLeft: 15}}>
            <Text
              style={{
                height: '100%',
                fontSize: 50,
              }}>
              {currentWeather.temperature}℃
            </Text>
          </View>
        </View>
        <View style={{flex: 1, paddingRight: 10, gap: 5}}>
          <Text style={{textAlign: 'right', fontSize: 20}}>
            {place.topRegion}
            <Text style={{textAlign: 'right', fontSize: 16}}>
              {' '}
              {place.middleRegion}
            </Text>
          </Text>
          <Text style={{textAlign: 'right', fontSize: 16}}>
            체감 기온 :{' '}
            <Text style={styles.textBold}>
              {currentWeather.perceivedTemperature}℃
            </Text>
          </Text>
          <Text style={{textAlign: 'right', fontSize: 16}}>
            습도:{' '}
            <Text style={styles.textBold}>{currentWeather.humidity}%</Text>,
            풍속:{' '}
            <Text style={styles.textBold}>{currentWeather.windSpeed}m/s</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  flexOne: {
    flex: 1,
  },
  mainsection: {
    backgroundColor: 'white',
  },
  character: {
    flex: 1,
  },
  currentInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 5,
    padding: 15,
  },
  textBold: {
    color: 'black',
    fontWeight: 'bold',
  },
});
