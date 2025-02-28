import {create} from 'zustand';
import {MidWeathers} from '../../../entitites/Weather';

interface MidWeathersStore {
  midWeathers: MidWeathers[];
  setMidWeather: (newMidWeathers: MidWeathers[]) => void;
}

export const useMidWeathers = create<MidWeathersStore>(set => ({
  midWeathers: [],
  setMidWeather(newMidWeathers) {
    set(state => ({...state, midWeathers: newMidWeathers}));
  },
}));
