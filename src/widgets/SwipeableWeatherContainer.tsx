import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';

import {CurWeather, HourlyWeathers} from '../entitites/Weather';
import AsyncStorage from '@react-native-async-storage/async-storage';

import dayjs from 'dayjs';
import CharacterWeatherDisplay from './CharacterWeatherDisplay';

interface SwipeableWeatherContainerProps {
  currentWeather: CurWeather;
  hourlyWeathers: HourlyWeathers;
  sunRiseSet: [string, string];
}

export default function SwipeableWeatherContainer({
  currentWeather,
  hourlyWeathers,
  sunRiseSet,
}: SwipeableWeatherContainerProps) {
  const [selectedTime, setSelectedTime] = useState<string>('');

  useEffect(() => {
    setTimeout(async () => {
      try {
        const savedDate = await AsyncStorage.getItem('selectedWeatherDate');
        if (savedDate) {
          setSelectedTime(savedDate);
        }
      } catch (error) {
        setSelectedTime(`${dayjs().add(6, 'hours').format('HH')}00`);
      }
    }, 1000);
    return () => {
      setSelectedTime('');
    };
  }, []);

  const currentTime = dayjs().format('HHmm');
  const targetDate =
    +currentTime > +selectedTime
      ? dayjs().add(1, 'days').format('YYYYMMDD')
      : dayjs().format('YYYYMMDD');

  const targetData = hourlyWeathers[targetDate].weathers.find(
    weather => weather.time === selectedTime,
  );

  const targetWeather = targetData
    ? new CurWeather(
        targetData.temperature,
        targetData.perceivedTemperature,
        targetData.rainWeight,
        targetData.humidity,
        targetData.rain,
        targetData.windDirection,
        targetData.windSpeed,
      )
    : null;

  const mainWeatherList = [currentWeather, targetWeather];

  return (
    <View style={styles.container}>
      <Swiper
        showsPagination
        horizontal={true}
        activeDotColor="gray"
        autoplayTimeout={5}
        style={styles.swiper}>
        {mainWeatherList.map((weather, i) => (
          <CharacterWeatherDisplay
            key={i === 0 ? 'cur' : 'sel'}
            currentWeather={weather}
            sunRiseSet={sunRiseSet}
            condition={
              i === 0
                ? hourlyWeathers[Object.keys(hourlyWeathers)[0]].weathers[0]
                    .condition
                : targetData?.condition ?? 1
            }
            selectedDate={i === 0 ? undefined : `${targetDate}${selectedTime}`}
          />
        ))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 560,
  },
  swiper: {},
  slide: {},
});
