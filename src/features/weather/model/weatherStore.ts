import {create} from 'zustand';
import {CurWeather, Weather, Weathers} from '../../../entitites/Weather';

interface WeatherStore {
  currentWeather: CurWeather;
  weathers: Weathers;
  sunRiseSet: [string, string];
  setCurWeather: <T extends keyof CurWeather>(
    key: T,
    value: CurWeather[T],
  ) => void;
  changeCurWeather: (newWeather: CurWeather) => void;
  setWeathers: (newWeathers: Weathers) => void;
  changeWeathers: (date: string, time: string, value: Weather) => void;
  setSunRiseSet: (newRiseSet: [string, string]) => void;
}

export const useWeatherStore = create<WeatherStore>(set => ({
  currentWeather: new CurWeather(0, 0, 0, 0, 0, '', 0),
  weathers: {},
  sunRiseSet: ['', ''],
  setCurWeather(key, value) {
    set(state => ({
      ...state,
      currentWeather: {...state.currentWeather, [key]: value},
    }));
  },
  changeCurWeather(newWeather) {
    set(state => ({...state, currentWeather: newWeather}));
  },
  setWeathers(newWeathers) {
    set(state => ({...state, weathers: newWeathers}));
  },
  changeWeathers(date, time, value) {
    set(state => ({
      ...state,
      weathers: {
        ...state.weathers,
        [date]: {...state.weathers[date], [time]: value},
      },
    }));
  },
  setSunRiseSet(newRiseSet) {
    set(state => ({...state, sunRiseSet: newRiseSet}));
  },
}));
