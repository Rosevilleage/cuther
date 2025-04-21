import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import dayjs from 'dayjs';
import {responsiveFontSize} from '../app/style/responsivePixel';
import {useGeoLocation} from '../features/geoLocation/model/geoLocationStore';
import CharacterRenderer from '../features/weather/ui/CharacterRenderer';
import {perceivedTemperatureToLevel} from '../features/weather/lib/weatherUtil';
import WeatherConditionRenderer from '../features/weather/ui/WeatherConditionRenderer';
import {CurWeather} from '../entitites/Weather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimeSelectModal from '../features/weather/ui/TimeSelectModal';

export default function CharacterWeatherDisplay({
  currentWeather,
  selectedDate,
  setSelectedDate,
  sunRiseSet,
  condition,
}: {
  currentWeather: CurWeather | null;
  selectedDate?: string;
  setSelectedDate?: React.Dispatch<React.SetStateAction<string>>;
  sunRiseSet: [string, string];
  condition: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const region = useGeoLocation(state => state.region);

  if (!currentWeather) {
    return null;
  }

  const [sunRise, sunSet] = sunRiseSet;
  const perceivedTempLevel = perceivedTemperatureToLevel(
    currentWeather.perceivedTemperature,
  );
  const base_time = dayjs().format('HHmm');

  const handleTimeSelect = (hour: number) => {
    if (selectedDate && selectedDate !== '' && setSelectedDate) {
      const newDate = dayjs()
        .hour(hour)
        .minute(0)
        .second(0)
        .millisecond(0)
        .format('HHmm');
      setSelectedDate(newDate);
      AsyncStorage.setItem('selectedWeatherDate', newDate);
    }
  };

  return (
    <View style={styles.mainsection}>
      <View style={selectedDate ? styles.dateContainer : {marginBottom: 45}}>
        {selectedDate && (
          <>
            <Pressable
              onPress={() => setIsOpen(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                backgroundColor: '#87CEEB',
                paddingHorizontal: 16,
                paddingVertical: 10,
                paddingTop: 8,
                borderRadius: 12,
              }}>
              <Text style={[styles.dateText, {color: '#FFFFFF'}]}>
                {dayjs(selectedDate, 'YYYYMMDDHHmm').format('M월 D일')}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  {
                    color: '#FFFFFF',
                    fontWeight: '700',
                  },
                ]}>
                {dayjs(selectedDate, 'YYYYMMDDHHmm').format('H시')}
              </Text>
              <TimeSelectModal
                visible={isOpen}
                onClose={() => setIsOpen(false)}
                onSelect={handleTimeSelect}
                currentHour={+dayjs(selectedDate, 'YYYYMMDDHHmm').format('H')}
              />
            </Pressable>
          </>
        )}
      </View>
      <View style={styles.characterContainer}>
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
            size={responsiveFontSize(60)}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(50),
              }}>
              {currentWeather.temperature}℃
            </Text>
          </View>
        </View>
        <View style={{gap: 5, justifyContent: 'center'}}>
          <Text style={styles.textRightLarge}>
            {region.area1}
            <Text style={[styles.textRightNormal, styles.textNormal]}>
              {' '}
              {region.area2}
            </Text>
          </Text>
          <Text style={[styles.textRightNormal, styles.textNormal]}>
            체감 기온 :{' '}
            <Text style={styles.textBold}>
              {currentWeather.perceivedTemperature}℃
            </Text>
          </Text>
          <Text style={[styles.textRightNormal, styles.textNormal]}>
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
    flex: 1,
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
    fontSize: responsiveFontSize(18),
  },
  characterContainer: {
    width: '100%',
    aspectRatio: 1,
    overflow: 'hidden',
  },
  currentInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  textRightLarge: {
    textAlign: 'right',
    fontSize: responsiveFontSize(20),
  },
  textRightNormal: {
    textAlign: 'right',
    fontSize: responsiveFontSize(16),
  },
  textBold: {
    color: 'black',
    fontWeight: 'bold',
  },
  textNormal: {
    color: '#666',
    fontWeight: 'normal',
  },
});
