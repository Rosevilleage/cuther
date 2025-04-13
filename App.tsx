/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useEffect, useState} from 'react';
import Navigation from './src/app/navigation';
import {Platform, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {enableScreens} from 'react-native-screens';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';

import {getGeoLocation} from './src/features/geoLocation/api/geoLocationApi';
import {geoLocationDTOToEntity} from './src/features/geoLocation/model/geoLocationMapper';
import {useGeoLocation} from './src/features/geoLocation/model/geoLocationStore';
import {getXYConv} from './src/features/geoLocation/lib/geoLocationUtils';
import Alert from './src/app/components/Alert';

enableScreens(false);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: (failureCount, error) => {
        if (error.message.slice(0, 2) === '03') {
          return failureCount < 2;
        }
        return false;
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error: unknown) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(error);
      }
    },
  }),
});

function App(): React.JSX.Element {
  const [isAlertVisible, setIsAlertVisible] = useState<{
    visible: boolean;
    title: string;
    message: string;
  } | null>(null);
  const {setLatLng, setXY, setRegion} = useGeoLocation();
  useEffect(() => {
    const requestLocationPermission = async () => {
      const permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

      const result = await request(permission);

      if (result === RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          async position => {
            const {latitude, longitude} = position.coords;
            const {nx, ny, lat, lng} = getXYConv(latitude, longitude);
            setLatLng(lat, lng);
            setXY(nx, ny);
            const placeData = await getGeoLocation(lat, lng).then(
              res => res.data,
            );

            if (placeData.status.code !== 0) {
              setIsAlertVisible({
                visible: true,
                title: '서비스 이용 불가 지역',
                message: '해당 서비스는 대한민국에서만 지원됩니다.',
              });
            } else {
              const formattedPlace = geoLocationDTOToEntity(placeData);
              setRegion(formattedPlace);
            }
          },
          error => {
            setIsAlertVisible({
              visible: true,
              title: '위치 오류',
              message: error.message,
            });
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        setIsAlertVisible({
          visible: true,
          title: '위치 권한 필요',
          message: '위치 서비스를 사용하려면 권한을 허용해주세요.',
        });
      }
    };

    requestLocationPermission();
  }, [setLatLng, setRegion, setXY]);

  if (isAlertVisible) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Alert {...isAlertVisible} onClose={() => setIsAlertVisible(null)} />
      </View>
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
