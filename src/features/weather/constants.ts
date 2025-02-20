import {ImageURISource} from 'react-native';

interface WeatherConditionPath {
  sun: ImageURISource;
  moon: ImageURISource;
  sunCloud: ImageURISource;
  moonCloud: ImageURISource;
  cloud: ImageURISource;
  rain: ImageURISource;
  snow: ImageURISource;
  rainSnow: ImageURISource;
  thunder: ImageURISource;
}
export const WEATHER_CONDITION_PATH: WeatherConditionPath = {
  sun: require('./../../../assets/icons/svg/sun.svg'),
  moon: require('./../../../assets/icons/svg/moon.svg'),
  sunCloud: require('./../../../assets/icons/svg/sun_clouid.svg'),
  moonCloud: require('./../../../assets/icons/svg/moon_cloud.svg'),
  cloud: require('./../../../assets/icons/svg/cloud.svg'),
  rain: require('./../../../assets/icons/svg/rain.svg'),
  snow: require('./../../../assets/icons/svg/snow.svg'),
  rainSnow: require('./../../../assets/icons/svg/rainSnow.svg'),
  thunder: require('./../../../assets/icons/svg/thunder.svg'),
};
