import React, {useEffect, useState} from 'react';
import {
  DailyWeathers,
  HourlyWeathers,
  Weather,
  WeatherCondition,
} from '../entitites/Weather';

import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import WeatherConditionRenderer from '../features/weather/ui/WeatherConditionRenderer';

import {genWeatherStatus} from '../features/weather/lib/weatherUtil';
import Arrow from './../assets/icons/svg/arrow.svg';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import RowHourlyWeathersView from '../features/weather/ui/RowHourlyWeathersView';
import {
  responsiveFontSize,
  responsiveHeight,
  responsivePixel,
} from '../app/style/responsivePixel';
import Skeleton from '../app/components/Skeleton';

type MixedDailyWeather = {
  [date: string]: {
    amCon: WeatherCondition;
    pmCon: WeatherCondition;
    min: number;
    max: number;
    hourly?: Weather[];
  };
};

const CELSIUS = '℃';

export default function WeatherList({
  hourlyWeathers,
  dailyWeathers,
  sunRiseSet,
  isLoading,
}: {
  hourlyWeathers: HourlyWeathers;
  dailyWeathers: DailyWeathers[];
  sunRiseSet: [string, string];
  isLoading: boolean;
}) {
  const [openItemId, setOpenItemId] = useState<number | null>(null);
  const weathers: MixedDailyWeather = {};
  const hourlyWeatherList = Object.entries(hourlyWeathers);

  hourlyWeatherList.slice(1, -1).forEach(([date, data]) => {
    const subMin = Math.min(
      ...data.weathers.map(({temperature}) => temperature),
    );
    const subMax = Math.max(
      ...data.weathers.map(({temperature}) => temperature),
    );
    const amWeather = data.weathers
      .filter(({time}) => +sunRiseSet[0] <= +time && +time < 1200)
      .sort((a, b) => a.temperature - b.temperature)[0];
    const pmWeather = data.weathers
      .filter(({time}) => +time >= 12 && +time < +sunRiseSet[1])
      .sort((a, b) => b.temperature - a.temperature)[0];

    weathers[date] = {
      amCon: genWeatherStatus(amWeather.condition, amWeather.rain),
      pmCon: genWeatherStatus(pmWeather.condition, pmWeather.rain),
      min: data.min ?? subMin,
      max: data.max ?? subMax,
      hourly: data.weathers,
    };
  });

  dailyWeathers.forEach(({date, amCon, pmCon, max, min}) => {
    if (!weathers[date]) {
      weathers[date] = {
        amCon: amCon as WeatherCondition,
        pmCon: pmCon as WeatherCondition,
        max,
        min,
      };
    } else {
      weathers[date] = {
        ...weathers[date],
        amCon: amCon as WeatherCondition,
        pmCon: pmCon as WeatherCondition,
        max,
        min,
      };
    }
  });
  if (isLoading) {
    return (
      <View style={styles.container}>
        <FlatList
          data={Array.from({length: 8}, (_, index) => index)}
          renderItem={() => <WeatherStackSkeletonUI />}
          scrollEnabled={false}
        />
      </View>
    );
  }
  if (
    !Object.entries(weathers).length ||
    !hourlyWeatherList.length ||
    !dailyWeathers.length
  ) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.entries(weathers)}
        renderItem={({item, index}) => (
          <WeatherStack
            dailyWeathers={item[1]}
            sunRiseSet={sunRiseSet}
            day={item[0]}
            isOpen={openItemId === index}
            onToggle={() => setOpenItemId(index === openItemId ? null : index)}
            isLast={index === Object.entries(weathers).length - 1}
          />
        )}
        scrollEnabled={false}
      />
    </View>
  );
}

function WeatherStack({
  dailyWeathers,
  day,
  isOpen,
  onToggle,
  sunRiseSet,
  isLast,
}: {
  dailyWeathers: MixedDailyWeather[keyof MixedDailyWeather];
  day: string;
  isOpen: boolean;
  sunRiseSet: [string, string];
  onToggle: () => void;
  isLast: boolean;
}) {
  const mm = day.substring(4, 6),
    dd = day.substring(6);

  const animationHeight = useSharedValue(0);
  const ToggleExpand = () => {
    onToggle();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: animationHeight.value,
  }));

  useEffect(() => {
    animationHeight.value = isOpen
      ? withTiming(130, {
          duration: 300,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        })
      : withTiming(0, {
          duration: 300,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
  }, [animationHeight, isOpen]);

  return (
    <View style={isLast ? styles.lastItemContainer : styles.itemContainer}>
      <ListStackContainer
        onPress={ToggleExpand}
        touchable={!!dailyWeathers.hourly}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginBottom: 15,
            alignItems: 'center',
          }}>
          <Text style={styles.itemText}>
            {+mm}월 {dd}일
          </Text>
          {/* icon */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
            }}>
            <WeatherConditionRenderer
              condition={dailyWeathers.amCon}
              rain={0}
              light
              size={responsivePixel(35)}
            />
            <Text style={{fontSize: 30, color: 'lightgray'}}>|</Text>
            <WeatherConditionRenderer
              condition={dailyWeathers.amCon}
              rain={0}
              light
              size={responsivePixel(35)}
            />
          </View>
          {/* min max */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}>
            <Text style={styles.itemText}>
              {dailyWeathers.min}
              {CELSIUS}
            </Text>
            <Text style={styles.itemText}>|</Text>
            <Text style={styles.itemText}>
              {dailyWeathers.max}
              {CELSIUS}
            </Text>
          </View>
        </View>
        {dailyWeathers.hourly && (
          <View style={{justifyContent: 'center'}}>
            <Arrow
              style={{
                transform: [{rotate: isOpen ? '180deg' : '0deg'}],
                marginTop: -15,
              }}
            />
          </View>
        )}
        {/* horizontal scroll */}
      </ListStackContainer>
      {dailyWeathers.hourly && (
        <Animated.View style={[animatedStyle, {overflow: 'hidden'}]}>
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
              marginTop: 5,
              backgroundColor: '#ffffff',
            }}>
            <RowHourlyWeathersView
              hourlyWeathers={dailyWeathers.hourly}
              sunRiseSet={sunRiseSet}
              day={day}
            />
          </View>
        </Animated.View>
      )}
    </View>
  );
}

function ListStackContainer({
  children,
  onPress,
  touchable,
}: {
  children: React.ReactNode;
  onPress: () => void;
  touchable: boolean;
}) {
  return touchable ? (
    <TouchableOpacity style={{flexDirection: 'row', gap: 10}} onPress={onPress}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={{flexDirection: 'row', gap: 10}}>{children}</View>
  );
}

function WeatherStackSkeletonUI() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        padding: 10,
      }}>
      <Skeleton
        width={responsivePixel(50)}
        height={responsiveHeight(40)}
        borderRadius={5}
      />
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          flex: 1,
          justifyContent: 'center',
        }}>
        <Skeleton
          width={responsivePixel(50)}
          height={responsiveHeight(50)}
          borderRadius={20}
        />
        <Text style={{fontSize: 30, color: 'lightgray'}}>|</Text>

        <Skeleton
          width={responsivePixel(50)}
          height={responsiveHeight(50)}
          borderRadius={20}
        />
      </View>
      <Skeleton
        width={responsivePixel(100)}
        height={responsiveHeight(40)}
        borderRadius={5}
      />
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
  lastItemContainer: {
    padding: 15,
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  toggleButton: {
    alignSelf: 'flex-end',
    padding: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  toggleButtonText: {
    fontSize: responsiveFontSize(16),
  },
  itemText: {
    fontSize: responsiveFontSize(17),
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
    fontSize: responsiveFontSize(16),
  },
});
