import React, {useEffect, useState} from 'react';
import {HourlyWeathers} from '../entitites/Weather';

import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import WeatherConditionRenderer from '../features/weather/ui/WeatherConditionRenderer';

import dayjs from 'dayjs';
import {mostFrequentConditionRain} from '../features/weather/lib/weatherUtil';
import Arrow from './../assets/icons/svg/arrow.svg';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import RowHourlyWeathersView from '../features/weather/ui/RowHourlyWeathersView';
const CELSIUS = '℃';

export default function WeatherList({
  hourlyWeathers,
  sunRiseSet,
}: {
  hourlyWeathers: HourlyWeathers;

  sunRiseSet: [string, string];
}) {
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.entries(hourlyWeathers).slice(1)}
        renderItem={({item, index}) => (
          <WeatherStack
            hourlyWeathers={item[1]}
            sunRiseSet={sunRiseSet}
            day={item[0]}
            isOpen={openItemId === index}
            onToggle={() => setOpenItemId(index)}
          />
        )}
        scrollEnabled={false}
      />
    </View>
  );
}

function WeatherStack({
  hourlyWeathers: dailyWeathers,
  day,
  isOpen,
  onToggle,
  sunRiseSet,
}: {
  hourlyWeathers: HourlyWeathers[keyof HourlyWeathers];
  day: string;
  isOpen: boolean;
  sunRiseSet: [string, string];
  onToggle: () => void;
}) {
  const [sunRise, sunSet] = sunRiseSet;
  const mm = day.substring(4, 6),
    dd = day.substring(6);
  const nowTime = dayjs().format('HHmm');

  const {condition, rain} = mostFrequentConditionRain(dailyWeathers.weathers);

  const animationHeight = useSharedValue(0);
  const ToggleExpand = () => {
    onToggle();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: animationHeight.value,
  }));

  useEffect(() => {
    animationHeight.value = isOpen ? withTiming(130) : withTiming(0);
  }, [animationHeight, isOpen]);

  return (
    <View style={styles.itemContainer}>
      <View style={{flexDirection: 'row', gap: 10}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginBottom: 15,
            alignItems: 'center',
          }}>
          <Text>
            {+mm}월 {dd}일
          </Text>
          {/* icon */}
          <View style={{flex: 1, alignItems: 'center'}}>
            <WeatherConditionRenderer
              condition={condition}
              rain={rain}
              light={nowTime >= sunRise && nowTime < sunSet}
              size={35}
            />
          </View>
          {/* min max */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}>
            <Text>
              {dailyWeathers.min ||
                Math.min(
                  ...dailyWeathers.weathers.map(weather => weather.temperature),
                )}
              {CELSIUS}
            </Text>
            <Text>|</Text>
            <Text>
              {dailyWeathers.max ||
                Math.max(
                  ...dailyWeathers.weathers.map(weather => weather.temperature),
                )}
              {CELSIUS}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={ToggleExpand}
          style={{justifyContent: 'center'}}>
          <Arrow
            style={{
              transform: [{rotate: isOpen ? '180deg' : '0deg'}],
              marginTop: -15,
            }}
          />
        </TouchableOpacity>
        {/* horizontal scroll */}
      </View>
      {/* {isOpen && ( */}
      <Animated.View style={[animatedStyle, {overflow: 'hidden'}]}>
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 10,
            marginTop: 5,
            backgroundColor: '#ffffff',
          }}>
          <RowHourlyWeathersView
            hourlyWeathers={dailyWeathers.weathers}
            sunRiseSet={sunRiseSet}
            day={day}
          />
        </View>
        {/* )} */}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  itemContainer: {
    padding: 15,
    paddingHorizontal: 0,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 15,
  },
  toggleButton: {
    alignSelf: 'flex-end',
    padding: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  toggleButtonText: {
    fontSize: 16,
  },
  itemText: {
    fontSize: 18,
    marginVertical: 5,
  },
  scrollView: {
    marginTop: 5,
  },
  scrollItem: {
    backgroundColor: '#007bff',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  scrollItemText: {
    fontSize: 16,
  },
});
