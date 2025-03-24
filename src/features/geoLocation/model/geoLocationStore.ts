import {create} from 'zustand';
import {
  getMidTaRegId,
  getMidWeatherRegId,
  getStnId,
  MidTaRegId,
} from '../lib/geoLocationUtils';

export type Region = {
  [key in `area${0 | 1 | 2 | 3 | 4}`]: string;
};
export type RegId =
  | '11B00000'
  | '11H20000'
  | '11H10000'
  | '11F20000'
  | '11F10000'
  | '11C20000'
  | '11C10000'
  | '11D20000'
  | '11D10000'
  | '11G00000';
export type StnId = 109 | 159 | 143 | 156 | 146 | 133 | 131 | 105 | 184;

interface UseGeoLocation {
  lat: number;
  lng: number;
  nx: number;
  ny: number;
  region: Region;
  stnId: StnId | undefined;
  regId: RegId | undefined;
  midTaRegId: MidTaRegId | undefined;
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
  regId: undefined,
  midTaRegId: undefined,
  region: {
    area0: '',
    area1: '',
    area2: '',
    area3: '',
    area4: '',
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
      stnId: getStnId(newRegion.area1),
      regId: getMidWeatherRegId(newRegion),
      midTaRegId: getMidTaRegId(newRegion),
    }));
  },
}));
