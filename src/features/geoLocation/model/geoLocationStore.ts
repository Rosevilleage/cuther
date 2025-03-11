import {create} from 'zustand';
import {getStnId} from '../../\bspecialReport/lib/specialUtil';

type Region = {
  rootRegion: string;
  topRegion: string;
  middleRegion: string;
};

interface UseGeoLocation {
  lat: number;
  lng: number;
  nx: number;
  ny: number;
  region: Region;
  stnId: 109 | 159 | 143 | 156 | 146 | 133 | 131 | 105 | 184 | undefined;
  setLatLng: (latitude: number, longitude: number) => void;
  setXY: (x: number, y: number) => void;
  setRegion: (newRegion: Region) => void;
}

export const useGeoLocation = create<UseGeoLocation>(set => ({
  lat: 0,
  lng: 0,
  nx: 0,
  ny: 0,
  stnId: undefined,
  region: {
    rootRegion: '',
    topRegion: '',
    middleRegion: '',
  },
  setLatLng(latitude, longitude) {
    set(state => ({...state, lat: latitude, lng: longitude}));
  },
  setXY(x, y) {
    set(state => ({...state, nx: x, ny: y}));
  },
  setRegion(newRegion) {
    set(state => ({
      ...state,
      region: newRegion,
      stnId: getStnId(newRegion.rootRegion),
    }));
  },
  set,
}));
