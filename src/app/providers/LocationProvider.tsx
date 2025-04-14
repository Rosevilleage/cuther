import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {getGeoLocation} from '../../features/geoLocation/api/geoLocationApi';
import {geoLocationDTOToEntity} from '../../features/geoLocation/model/geoLocationMapper';
import {getXYConv} from '../../features/geoLocation/lib/geoLocationUtils';
import {useGeoLocation} from '../../features/geoLocation/model/geoLocationStore';
import Alert from '../components/Alert';

interface LocationProviderProps {
  children: React.ReactNode;
}

const LocationProvider: React.FC<LocationProviderProps> = ({children}) => {
  const [isAlertVisible, setIsAlertVisible] = useState<{
    visible: boolean;
    title: string;
    message: string;
  } | null>(null);
  const {setLatLng, setXY, setRegion} = useGeoLocation();

  useEffect(() => {
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
  }, [setLatLng, setXY, setRegion]);

  if (isAlertVisible) {
    return (
      <View style={styles.container}>
        <Alert
          visible={isAlertVisible.visible}
          onClose={() => setIsAlertVisible(null)}
          message={isAlertVisible.message}
          title={isAlertVisible.title}
        />
      </View>
    );
  }

  return <>{children}</>;
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
});

export default LocationProvider;
