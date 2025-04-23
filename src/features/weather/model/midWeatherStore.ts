import {create} from 'zustand';
import {DailyWeathers} from '../../../entities/Weather';

interface MidWeathersStore {
  midWeathers: DailyWeathers[];
  setMidWeather: (newMidWeathers: DailyWeathers[]) => void;
}

export const useMidWeathers = create<MidWeathersStore>(set => ({
  midWeathers: [],
  setMidWeather(newMidWeathers) {
    set(state => ({...state, midWeathers: newMidWeathers}));
  },
}));
