import React, {useEffect} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
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
        const fineLocationResult = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );

        if (fineLocationResult === RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          const coarseLocationResult = await request(
            PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
          );

          if (coarseLocationResult === RESULTS.GRANTED) {
            getCurrentLocation();
          } else {
            setCustomError({
              title: '위치 권한 필요',
              message:
                '위치 서비스를 사용하려면 위치 권한을 허용하고 앱을 다시 시작해주세요.',
            });
          }
        }
      };

      const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
          async position => {
            const {latitude, longitude} = position.coords;
            const {nx, ny} = getXYConv(latitude, longitude);
            setLatLng(latitude, longitude);
            setXY(nx, ny);
            const placeData = await getGeoLocation(latitude, longitude)
              .then(res => res.data)
              .catch(() => {
                setCustomError({
                  title: '일시적인 서비스 오류',
                  message:
                    '현재 날씨 정보를 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
                });
              });

            if (placeData?.status.code !== 0) {
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
      };

      requestLocationPermission();
    }
  }, [customError, setCustomError, setLatLng, setXY, setRegion]);

  return <>{children}</>;
};

export default LocationProvider;
