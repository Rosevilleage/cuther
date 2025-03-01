import {create} from 'zustand';
import {CurWeather, Weather, DailyWeathers} from '../../../entitites/Weather';

interface WeatherStore {
  currentWeather: CurWeather;
  dailyWeathers: DailyWeathers;
  sunRiseSet: [string, string];
  setCurWeather: <T extends keyof CurWeather>(
    key: T,
    value: CurWeather[T],
  ) => void;
  changeCurWeather: (newWeather: CurWeather) => void;
  setDailyWeathers: (newWeathers: DailyWeathers) => void;
  changeDailyWeathers: (date: string, value: Weather) => void;
  setSunRiseSet: (newRiseSet: [string, string]) => void;
}

export const useWeatherStore = create<WeatherStore>(set => ({
  currentWeather: new CurWeather(0, 0, 0, 0, 0, '', 0),
  dailyWeathers: {},
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
  setDailyWeathers(newWeathers) {
    set(state => ({...state, dailyWeathers: newWeathers}));
  },
  changeDailyWeathers(date, value) {
    set(state => {
      const {time} = value;
      const days = state.dailyWeathers[date].weathers;
      const target = days.find(item => item.time === time);
      if (!target) {
        return state;
      }

      return {
        ...state,
        dailyWeathers: {
          ...state.dailyWeathers,
          [date]: {
            ...state.dailyWeathers[date],
            weathers: days.map(w => (w.time === time ? value : w)),
          },
        },
      };
    });
  },
  setSunRiseSet(newRiseSet) {
    set(state => ({...state, sunRiseSet: newRiseSet}));
  },
}));
