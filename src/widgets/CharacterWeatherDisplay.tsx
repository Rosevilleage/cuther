import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import CharacterRenderer from '../features/weather/ui/CharacterRenderer';
import {perceivedTemperatureToLevel} from '../features/weather/lib/weatherUtil';
import dayjs from 'dayjs';
import WeatherConditionRenderer from '../features/weather/ui/WeatherConditionRenderer';
import {CurWeather} from '../entitites/Weather';
import {useGeoLocation} from '../features/geoLocation/model/geoLocationStore';

export default function CharacterWeatherDisplay({
  currentWeather,
  sunRiseSet,
  condition,
  selectedDate,
}: {
  currentWeather: CurWeather | null;
  sunRiseSet: [string, string];
  condition: number;
  selectedDate?: string;
}) {
  const region = useGeoLocation(state => state.region);
  if (!currentWeather) {
    return null;
  }
  const [sunRise, sunSet] = sunRiseSet;
  const perceivedTempLevel = perceivedTemperatureToLevel(
    currentWeather.perceivedTemperature,
  );
  const base_time = dayjs().format('HHmm');

  return (
    <View style={styles.mainsection}>
      <View style={selectedDate ? styles.dateContainer : {marginBottom: 45}}>
        {selectedDate && (
          <>
            <Text style={[styles.dateText, {color: 'gray'}]}>
              {dayjs(selectedDate, 'YYYYMMDDHHmm').format('MM월 DD일')}
            </Text>
            <Text
              style={[
                styles.dateText,
                {
                  color: 'black',
                },
              ]}>
              {dayjs(selectedDate, 'YYYYMMDDHHmm').format('HH시')}
            </Text>
          </>
        )}
      </View>
      <View
        style={{
          height: 400,
          overflow: 'hidden',
        }}>
        <CharacterRenderer type={perceivedTempLevel} loop autoPlay />
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
              gap: 5,
            },
          ]}>
          <WeatherConditionRenderer
            condition={condition}
            rain={currentWeather.rain}
            light={+base_time >= +sunRise && +base_time <= +sunSet}
            size={60}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 50,
              }}>
              {currentWeather.temperature}℃
            </Text>
          </View>
        </View>
        <View style={{flex: 1, gap: 5}}>
          <Text style={{textAlign: 'right', fontSize: 20}}>
            {region.area1}
            <Text style={{textAlign: 'right', fontSize: 16}}>
              {' '}
              {region.area2}
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
  flexOne: {
    flex: 1,
  },
  mainsection: {
    height: 560,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 5,
    padding: 10,
    alignItems: 'center',
  },
  dateText: {
    textAlign: 'left',
    fontSize: 18,
  },
  character: {
    flex: 1,
  },
  currentInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 15,
  },
  textBold: {
    color: 'black',
    fontWeight: 'bold',
  },
});
