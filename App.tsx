/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useEffect} from 'react';
import Navigation from './src/app/navigation';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {enableScreens} from 'react-native-screens';
import dayjs from 'dayjs';
import {getPlaceName} from './src/features/place/api/placeApi';
import {placeDTOToEntity} from './src/features/place/model/placeMapper';
import {usePlaceStore} from './src/features/place/model/placeStore';
import {getSunRiseSet} from './src/features/weather/api/riseApi';
import {
  getNcstWeather,
  getFcstWeather,
  getMidWeather,
} from './src/features/weather/api/WeatherApi';
import {dfsXYConv} from './src/features/weather/lib/latlonGridConverter';
import {
  getMidWeatherRegId,
  roundToNearestBaseTime,
} from './src/features/weather/lib/weatherUtil';
import {
  BaseDate,
  BaseTime,
  WeatherFcstItemDTO,
  VilageFcstCategory,
} from './src/features/weather/model/weatherDTO';
import {
  ncstDTOToCurrentWeather,
  vilageFcstDTOToWeathers,
} from './src/features/weather/model/weatherMapper';
import {useWeatherStore} from './src/features/weather/model/weatherStore';
import {
  getPreReports,
  getSpecialReports,
} from './src/features/\bspecialReport/api/specialReportApi';
import {getStnId} from './src/features/\bspecialReport/lib/specialUtil';
import {Place} from './src/entitites/place';
import {
  preReportDTOToEntity,
  specialReportDTOToEntity,
} from './src/features/\bspecialReport/model/specialReportMapper';
import {useSpecialReport} from './src/features/\bspecialReport/model/specialReportStore';

enableScreens(false);

function App(): React.JSX.Element {
  useEffect(() => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always');
    } else if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  }, []);
  const {
    changeCurWeather,
    setCurWeather,
    setDailyWeathers: setWeathers,
    setSunRiseSet,
  } = useWeatherStore(state => state);
  const {setPlace} = usePlaceStore();
  const {setPreReports, setSpecialReports} = useSpecialReport();
  useEffect(() => {
    Geolocation.getCurrentPosition(async position => {
      try {
        const {latitude, longitude} = position.coords;
        // console.log(latitude, longitude);
        if (latitude && longitude) {
          const {nx, ny} = dfsXYConv('toXY', latitude, longitude);
          const base_date = dayjs().format('YYYYMMDD') as BaseDate;
          const base_time = dayjs().format('HHmm') as BaseTime;

          const riseSetData = await getSunRiseSet(
            base_date,
            latitude,
            longitude,
          ).then(res => res.data.response);

          if (riseSetData.header.resultCode === '00') {
            const data = riseSetData.body.items.item;
            setSunRiseSet([data.sunrise.trim(), data.sunset.trim()]);
          }
          const params = {
            base_date,
            base_time,
            nx,
            ny,
          };

          const ncstData = await getNcstWeather(params).then(res => {
            return res.data.response;
          });
          if (ncstData.header.resultCode === '00') {
            const newCurWeather = ncstDTOToCurrentWeather(
              ncstData.body.items.item,
            );
            changeCurWeather(newCurWeather);
          }

          const vilageDate = roundToNearestBaseTime(base_date, base_time);
          const vilageParams = {
            base_date: vilageDate.baseDate,
            base_time: vilageDate.baseTime,
            nx,
            ny,
          };
          const vilageData = await getFcstWeather<
            WeatherFcstItemDTO<VilageFcstCategory>
          >('/getVilageFcst', vilageParams).then(res => {
            return res.data.response;
          });
          if (vilageData.header.resultCode === '00') {
            const newWeathers = vilageFcstDTOToWeathers(
              vilageData.body.items.item,
            );
            setWeathers(newWeathers);
          }
          const placeData = await getPlaceName(latitude, longitude).then(
            res => res.data,
          );
          let region: Place | undefined;

          if (placeData.status.code === 0) {
            const formattedPlace = placeDTOToEntity(placeData);
            setPlace(formattedPlace);
            region = formattedPlace;
          }

          if (region) {
            const stnId = getStnId(region.topRegion);

            if (stnId) {
              const specialReport = await getSpecialReports(stnId).then(res => {
                return res.data;
              });

              if (specialReport.response.header.resultCode === '00') {
                const specialReportEntity = specialReportDTOToEntity(
                  specialReport.response.body,
                );

                setSpecialReports(specialReportEntity);
              }

              const preReports = await getPreReports(stnId).then(res => {
                return res.data;
              });

              if (preReports.response.header.resultCode === '00') {
                const preReportEntity = preReportDTOToEntity(
                  preReports.response.body,
                );
                setPreReports(preReportEntity);
              }
            }

            // const regId = getMidWeatherRegId(region);
            // if (regId) {
            //   const midWeatherData = await getMidWeather(
            //     regId,
            //     `${base_date}${+base_time <= 1800 ? '0600' : '1800'}`,
            //   );
            //   console.log(midWeatherData);
            // }
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, [
    changeCurWeather,
    setCurWeather,
    setPlace,
    setPreReports,
    setSpecialReports,
    setSunRiseSet,
    setWeathers,
  ]);
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}

export default App;
