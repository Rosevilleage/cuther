import {create} from 'zustand';
import {Place} from '../../../entitites/place';

interface PlacseStore {
  place: Place;
  setPlace: (newPlace: Place) => void;
}

export const usePlaceStore = create<PlacseStore>(set => ({
  place: new Place('', '', ''),
  setPlace(newPlace) {
    set(state => ({...state, place: newPlace}));
  },
}));
