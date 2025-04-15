import React from 'react';
import {FlatList, Text, View} from 'react-native';
import RowHourlyWeathersView from '../features/weather/ui/RowHourlyWeathersView';
import {HourlyWeathers} from '../entitites/Weather';
import {
  responsiveFontSize,
  responsiveHeight,
  responsivePixel,
} from '../app/style/responsivePixel';
import Skeleton from '../app/components/Skeleton';

export default function TodayHourlyWeathers({
  weathers,
  sunRiseSet,
  isLoading,
}: {
  weathers: HourlyWeathers;
  sunRiseSet: [string, string];
  isLoading: boolean;
}) {
  const weatherInfo = Object.entries(weathers);

  if (!weatherInfo.length) {
    return null;
  }
  if (isLoading) {
    return <RenderTodayHourlySkeletonUI />;
  }
  const [day, {weathers: hourlyWeathers}] = weatherInfo[0];
  const totalWeathers =
    hourlyWeathers.length < 24
      ? [
          ...hourlyWeathers,
          ...weatherInfo[1][1].weathers.slice(0, 24 - hourlyWeathers.length),
        ]
      : hourlyWeathers;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingInline: 20,
        paddingBlock: 10,
        borderRadius: 15,
        gap: 20,
      }}>
      <Text style={{textAlign: 'center', fontSize: responsiveFontSize(23)}}>
        시간별 날씨
      </Text>
      <RowHourlyWeathersView
        hourlyWeathers={totalWeathers}
        sunRiseSet={sunRiseSet}
        day={day}
      />
    </View>
  );
}

function RenderTodayHourlySkeletonUI() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingInline: 20,
        paddingBlock: 10,
        borderRadius: 15,
        gap: 20,
      }}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Skeleton
          width={responsivePixel(200)}
          height={responsiveHeight(30)}
          borderRadius={5}
        />
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap: 28}}
        data={Array.from({length: 24})}
        renderItem={({item: _item}) => (
          <View style={{gap: 10, alignItems: 'center'}}>
            <Skeleton
              width={responsivePixel(40)}
              height={responsiveHeight(15)}
              borderRadius={5}
            />
            <Skeleton
              width={responsivePixel(25)}
              height={responsiveHeight(25)}
              borderRadius={responsivePixel(15)}
            />
            <Skeleton
              width={responsivePixel(50)}
              height={responsiveHeight(15)}
              borderRadius={5}
            />
          </View>
        )}
      />
    </View>
  );
}
