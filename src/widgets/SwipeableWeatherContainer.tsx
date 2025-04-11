import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

import {CurWeather, HourlyWeathers} from '../entitites/Weather';
import CharacterWeatherDisplay from './CharacterWeatherDisplay';
import {responsiveHeight, responsivePixel} from '../app/style/responsivePixel';
import Skeleton from '../app/components/Skeleton';

interface SwipeableWeatherContainerProps {
  currentWeather: CurWeather | null;
  hourlyWeathers: HourlyWeathers | Record<string, any>;
  sunRiseSet: [string, string];
  isLoading: boolean;
}

export default function SwipeableWeatherContainer({
  currentWeather,
  hourlyWeathers,
  sunRiseSet,
  isLoading,
}: SwipeableWeatherContainerProps) {
  const [selectedTime, setSelectedTime] = useState<string>('');

  useEffect(() => {
    setTimeout(async () => {
      try {
        const savedDate = await AsyncStorage.getItem('selectedWeatherDate');
        if (savedDate) {
          setSelectedTime(savedDate);
        }
        setSelectedTime(
          dayjs()
            .add(6, 'hours')
            .minute(0)
            .second(0)
            .millisecond(0)
            .format('HHmm'),
        );
      } catch (error) {
        console.log((error as Error).message + '\n' + 'Time select error');
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

  const targetData = hourlyWeathers[targetDate]?.weathers?.find(
    (weather: {time: string}) => weather.time === selectedTime,
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

  const mainWeatherList = [currentWeather, targetWeather].filter(Boolean);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.skeletonContainer}>
          <RenderSkeletonUI />
        </View>
      </View>
    );
  }

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
              i === 0 &&
              hourlyWeathers[Object.keys(hourlyWeathers)[0]]?.weathers?.[0]
                ? hourlyWeathers[Object.keys(hourlyWeathers)[0]].weathers[0]
                    .condition
                : targetData?.condition ?? 1
            }
            selectedDate={i === 0 ? undefined : `${targetDate}${selectedTime}`}
            setSelectedDate={i === 0 ? undefined : setSelectedTime}
          />
        ))}
      </Swiper>
    </View>
  );
}

function RenderSkeletonUI() {
  return (
    <View style={{flex: 1}}>
      <View style={styles.skeletonCharacterContainer}>
        <Skeleton
          width={responsivePixel(300)}
          height={responsivePixel(300)}
          borderRadius={responsivePixel(150)}
        />
      </View>
      <View style={styles.skeletonWeatherInfoContainer}>
        <View style={styles.skeletonWeatherInfoLeft}>
          <Skeleton
            width={responsivePixel(80)}
            height={responsivePixel(80)}
            borderRadius={responsivePixel(50)}
            style={{marginRight: responsivePixel(10)}}
          />
          <Skeleton
            width={responsivePixel(100)}
            height={responsivePixel(80)}
            borderRadius={responsivePixel(4)}
          />
        </View>
        <View style={styles.skeletonWeatherInfoRight}>
          <Skeleton
            width={responsivePixel(150)}
            height={responsivePixel(24)}
            borderRadius={responsivePixel(4)}
            style={{marginBottom: responsivePixel(10)}}
          />
          <Skeleton
            width={responsivePixel(180)}
            height={responsivePixel(20)}
            borderRadius={responsivePixel(4)}
            style={{marginBottom: responsivePixel(10)}}
          />
          <Skeleton
            width={responsivePixel(180)}
            height={responsivePixel(20)}
            borderRadius={responsivePixel(4)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(610),
  },
  swiper: {},
  skeletonContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: responsivePixel(20),
  },
  skeletonCharacterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: responsivePixel(400),
    marginBottom: responsivePixel(20),
  },
  skeletonWeatherInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: responsivePixel(15),
    padding: responsivePixel(15),
  },
  skeletonWeatherInfoLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skeletonWeatherInfoRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
