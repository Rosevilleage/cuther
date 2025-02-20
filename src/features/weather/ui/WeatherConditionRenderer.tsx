import React from 'react';
import {genWeatherStatus} from '../lib/weatherUtil';
import Sun from './../../../assets/icons/svg/sun_icon.svg';
import Moon from './../../../assets/icons/svg/moon_icon.svg';
import SunCloud from './../../../assets/icons/svg/sun_clouid_icon.svg';
import MoonCloud from './../../../assets/icons/svg/moon_cloud_icon.svg';
import Cloud from './../../../assets/icons/svg/cloud_icon.svg';
import Rain from './../../../assets/icons/svg/rain_icon.svg';
import Snow from './../../../assets/icons/svg/snow_icon.svg';
import RainSnow from './../../../assets/icons/svg/rainSnow_icon.svg';
// import Thunder from './../../../assets/icons/svg/thunder_icon.svg';

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
