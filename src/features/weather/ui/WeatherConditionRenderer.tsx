import React from 'react';
import {genWeatherStatus} from '../lib/weatherUtil';
import Sun from './../../../assets/icons/svg/sun.svg';
import Moon from './../../../assets/icons/svg/moon.svg';
import SunCloud from './../../../assets/icons/svg/sun_clouid.svg';
import MoonCloud from './../../../assets/icons/svg/moon_cloud.svg';
import Cloud from './../../../assets/icons/svg/cloud.svg';
import Rain from './../../../assets/icons/svg/rain.svg';
import Snow from './../../../assets/icons/svg/snow.svg';
import RainSnow from './../../../assets/icons/svg/rainSnow.svg';
// import Thunder from './../../../assets/icons/svg/thunder.svg';

export default function WeatherConditionRenderer({
  condition,
  rain,
  light,
  size,
}: {
  condition: number;
  rain: number;
  light: boolean;
  size: number;
}) {
  const status = genWeatherStatus(condition, rain);
  if (status === 'clear' || status === 'littleCloud') {
    if (light) {
      if (status === 'clear') {
        return <Sun width={size} height={size} />;
      }
      return <SunCloud width={size} height={size} />;
    }
    if (status === 'clear') {
      return <Moon width={size} height={size} />;
    }
    return <MoonCloud width={size} height={size} />;
  }

  if (status === 'rain') {
    return <Rain width={size} height={size} />;
  }
  if (status === 'snow') {
    return <Snow width={size} height={size} />;
  }
  if (status === 'rainSnow') {
    return <RainSnow width={size} height={size} />;
  }
  return <Cloud width={size} height={size} />;
}
