import {create} from 'zustand';
import {
  getMidTaRegId,
  getMidWeatherRegId,
  getStnId,
} from '../lib/geoLocationUtils';

export type Region = {
  rootRegion: string;
  topRegion: string;
  middleRegion: string;
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
export type MidTaRegId =
  | '11A00101'
  | '11B10101'
  | '11B10102'
  | '11B10103'
  | '11B20101'
  | '11B20102'
  | '11B20201'
  | '11B20202'
  | '11B20203'
  | '11B20204'
  | '11B20301'
  | '11B20302'
  | '11B20304'
  | '11B20305'
  | '11B20401'
  | '11B20402'
  | '11B20403'
  | '11B20404'
  | '11B20501'
  | '11B20502'
  | '11B20503'
  | '11B20504'
  | '11B20601'
  | '11B20602'
  | '11B20603'
  | '11B20604'
  | '11B20605'
  | '11B20606'
  | '11B20609'
  | '11B20610'
  | '11B20611'
  | '11B20612'
  | '11B20701'
  | '11B20702'
  | '11B20703'
  | '11C10101'
  | '11C10102'
  | '11C10103'
  | '11C10201'
  | '11C10202'
  | '11C10301'
  | '11C10302'
  | '11C10303'
  | '11C10304'
  | '11C10401'
  | '11C10402'
  | '11C10403'
  | '11C20101'
  | '11C20102'
  | '11C20103'
  | '11C20104'
  | '11C20201'
  | '11C20202'
  | '11C20301'
  | '11C20302'
  | '11C20303'
  | '11C20401'
  | '11C20402'
  | '11C20403'
  | '11C20404'
  | '11C20501'
  | '11C20502'
  | '11C20601'
  | '11C20602';
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
      regId: getMidWeatherRegId(newRegion),
      midTaRegId: getMidTaRegId(newRegion),
    }));
  },
}));
