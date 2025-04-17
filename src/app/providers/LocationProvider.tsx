import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {getGeoLocation} from '../../features/geoLocation/api/geoLocationApi';
import {geoLocationDTOToEntity} from '../../features/geoLocation/model/geoLocationMapper';
import {getXYConv} from '../../features/geoLocation/lib/geoLocationUtils';
import {useGeoLocation} from '../../features/geoLocation/model/geoLocationStore';
import {responsivePixel} from '../style/responsivePixel';
import NoData from './../../assets/animation/noData.svg';
import {useQueryClient} from '@tanstack/react-query';
interface LocationProviderProps {
  children: React.ReactNode;
}

const LocationProvider: React.FC<LocationProviderProps> = ({children}) => {
  const queryClient = useQueryClient();

  const [isAlertVisible, setIsAlertVisible] = useState<{
    visible: boolean;
    title: string;
    message: string;
  } | null>(null);
  const {setLatLng, setXY, setRegion} = useGeoLocation();

  useEffect(() => {
    if (isAlertVisible === null) {
      const requestLocationPermission = async () => {
        const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

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
                message:
                  '위치를 불러올 수 없습니다. GPS 혹은 네트워크를 확인해주세요.',
              });
              if (process.env.NODE_ENV === 'development') {
                console.log(error);
              }
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
    }
  }, [setLatLng, setXY, setRegion, isAlertVisible]);

  if (isAlertVisible) {
    return (
      <View style={styles.container}>
        <ErrorPage
          title={isAlertVisible.title}
          message={isAlertVisible.message}
          retry={() => {
            setIsAlertVisible(null);
            queryClient.removeQueries();
          }}
        />
      </View>
    );
  }

  return <>{children}</>;
};

const ErrorPage: React.FC<{
  title: string;
  message: string;
  retry: () => void;
}> = ({title, message, retry}) => {
  return (
    <View style={styles.container}>
      <NoData
        style={{width: responsivePixel(300), height: responsivePixel(300)}}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity style={styles.button} onPress={retry}>
        <Text style={styles.buttonText}>다시 시도</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContent: {
    alignItems: 'center',
    padding: 10,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  alertMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  title: {
    fontSize: responsivePixel(24),
    fontWeight: 'bold',
    marginBottom: responsivePixel(10),
    marginTop: responsivePixel(10),
  },
  message: {
    fontSize: responsivePixel(16),
    textAlign: 'center',
    marginBottom: responsivePixel(20),
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: responsivePixel(20),
    paddingVertical: responsivePixel(10),
    borderRadius: responsivePixel(8),
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: responsivePixel(16),
    fontWeight: 'bold',
  },
});

export default LocationProvider;
