import React, {useState} from 'react';
import {Weather, Weathers} from '../entitites/Weather';

import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import WeatherConditionRenderer from '../features/weather/ui/WeatherConditionRenderer';
import {useWeatherStore} from '../features/weather/model/weatherStore';
import dayjs from 'dayjs';
import {ScrollView} from 'react-native-gesture-handler';
import {mostFrequentConditionRain} from '../features/weather/lib/weatherUtil';

const CELSIUS = '℃';

export default function WeatherList({
  weathers,
}: {
  weathers: Weathers;
  sunRiseSet: [string, string];
}) {
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.entries(weathers)}
        renderItem={({item, index}) => (
          <WeatherStack
            hourlyWeathers={item[1]}
            day={item[0]}
            isOpen={openItemId === index}
            onToggle={() => setOpenItemId(index)}
          />
        )}
      />
    </View>
  );
}

function WeatherStack({
  hourlyWeathers,
  day,
  isOpen,
  onToggle,
}: {
  hourlyWeathers: Weather[];
  day: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [sunRise, sunSet] = useWeatherStore(state => state.sunRiseSet);
  const mm = day.substring(4, 6),
    dd = day.substring(6);
  const nowTime = dayjs().format('HHmm');

  const {condition, rain} = mostFrequentConditionRain(hourlyWeathers);

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
              size={20}
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
              {hourlyWeathers[0].min}
              {CELSIUS}
            </Text>
            <Text>|</Text>
            <Text>
              {hourlyWeathers[0].max}
              {CELSIUS}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={onToggle}>
          <Text style={styles.toggleButtonText}>{isOpen ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        {/* horizontal scroll */}
      </View>
      {isOpen && (
        <ScrollView
          horizontal
          style={{
            paddingVertical: 10,
            paddingHorizontal: 10,
            marginTop: 5,
            backgroundColor: '#f6f6f6',
          }}
          contentContainerStyle={{gap: 30}}>
          {hourlyWeathers.map(weather => (
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
                size={25}
              />
              <Text style={styles.scrollItemText}>
                {weather.temperature}
                {CELSIUS}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 15,
    paddingHorizontal: 15,
  },
  itemContainer: {
    padding: 15,
    paddingHorizontal: 0,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
