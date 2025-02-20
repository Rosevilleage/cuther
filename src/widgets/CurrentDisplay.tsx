import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

import CharactorRenderer from '../features/weather/ui/CharactorRenderer';
import {useWeatherStore} from '../features/weather/model/weatherStore';
import {
  genWeatherCondition,
  perceivedTemperatureToLevel,
} from '../features/weather/lib/weatherUtil';

export default function CurrentDisplay() {
  const currentWeather = useWeatherStore(state => state.currentWeather);
  const perceivedTempLevel = perceivedTemperatureToLevel(
    currentWeather.perceivedTemperature,
  );
  const weatherConditionPath = genWeatherCondition(
    currentWeather.condition,
    currentWeather.rain,
    true,
  );
  return (
    <View style={styles.mainsection}>
      <View
        style={{
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'black',
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
          <Image
            resizeMode="contain"
            source={weatherConditionPath}
            style={{height: 55, flex: 1}}
          />
          <View style={{flex: 1, justifyContent: 'center'}}>
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
          <Text style={{textAlign: 'right', fontSize: 20}}>서울 특별시</Text>
          <Text style={{textAlign: 'right', fontSize: 16}}>
            체감 기온 : {currentWeather.perceivedTemperature}℃
          </Text>
          <Text style={{textAlign: 'right', fontSize: 16}}>
            습도: {currentWeather.humidity}%, 풍속: {currentWeather.windSpeed}
            m/s
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
});
