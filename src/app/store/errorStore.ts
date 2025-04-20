import {create} from 'zustand';

interface ErrorStore {
  customError: {
    title: string;
    message: string;
  } | null;
  setCustomError: (error: {title: string; message: string}) => void;
  clearCustomError: () => void;
}

export const useErrorStore = create<ErrorStore>(set => ({
  customError: null,
  setCustomError: (error: {title: string; message: string}) => {
    set({customError: error});
  },
  clearCustomError: () => {
    set({customError: null});
  },
}));
