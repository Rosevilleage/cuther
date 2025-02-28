import {create} from 'zustand';
import {SpecialReports} from '../../../entitites/specialReports';

interface SpecialReportsStore {
  reports: SpecialReports[];
  setReports: (newReports: SpecialReports[]) => void;
}

export const useSpecialReport = create<SpecialReportsStore>(set => ({
  reports: [],
  setReports(newReports) {
    set(state => ({...state, reports: newReports}));
  },
}));
