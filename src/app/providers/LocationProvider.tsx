import React, {useEffect} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {getGeoLocation} from '../../features/geoLocation/api/geoLocationApi';
import {geoLocationDTOToEntity} from '../../features/geoLocation/model/geoLocationMapper';
import {getXYConv} from '../../features/geoLocation/lib/geoLocationUtils';
import {useGeoLocation} from '../../features/geoLocation/model/geoLocationStore';
import {useErrorStore} from '../store/errorStore';
interface LocationProviderProps {
  children: React.ReactNode;
}

const LocationProvider: React.FC<LocationProviderProps> = ({children}) => {
  const {customError, setCustomError} = useErrorStore();
  const {setLatLng, setXY, setRegion} = useGeoLocation();

  useEffect(() => {
    if (customError === null) {
      const requestLocationPermission = async () => {
        const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

        if (result === RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            async position => {
              const {latitude, longitude} = position.coords;
              const {nx, ny} = getXYConv(latitude, longitude);
              setLatLng(latitude, longitude);
              setXY(nx, ny);
              const placeData = await getGeoLocation(latitude, longitude).then(
                res => res.data,
              );

              if (placeData.status.code !== 0) {
                setCustomError({
                  title: '서비스 이용 불가 지역',
                  message: '해당 서비스는 대한민국에서만 지원됩니다.',
                });
              } else {
                const formattedPlace = geoLocationDTOToEntity(placeData);
                setRegion(formattedPlace);
              }
            },
            error => {
              setCustomError({
                title: '위치 오류',
                message:
                  '위치를 불러올 수 없습니다. GPS 혹은 네트워크를 확인해주세요.',
              });
              if (process.env.NODE_ENV === 'development') {
                console.log('위치 오류 :', error);
              }
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        } else {
          setCustomError({
            title: '위치 권한 필요',
            message: '위치 서비스를 사용하려면 권한을 허용해주세요.',
          });
        }
      };

      requestLocationPermission();
    }
  }, [setLatLng, setXY, setRegion, customError, setCustomError]);

  return <>{children}</>;
};

export default LocationProvider;
