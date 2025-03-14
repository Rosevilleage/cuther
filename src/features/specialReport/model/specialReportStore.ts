import {create} from 'zustand';
import {PreReport, SpecialReport} from '../../../entitites/specialReports';

interface SpecialReportsStore {
  specialReports: SpecialReport[];
  setSpecialReports: (newReports: SpecialReport[]) => void;
  preReports: PreReport[];
  setPreReports: (newReports: PreReport[]) => void;
}

export const useSpecialReport = create<SpecialReportsStore>(set => ({
  specialReports: [],
  preReports: [],
  setSpecialReports(newReports) {
    set(state => ({...state, specialReports: newReports}));
  },
  setPreReports(newReports) {
    set(state => ({...state, preReports: newReports}));
  },
}));
