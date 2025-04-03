import {Dimensions} from 'react-native';

const baseScreenWidth = 480;
const baseScreenHeight = 1040;
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

export function responsivePixel(size: number) {
  return (width / baseScreenWidth) * size;
}

export function responsiveFontSize(size: number) {
  const base = (width * (1 / baseScreenWidth)).toFixed(2);
  return size * Number(base);
}

export function responsiveHeight(size: number) {
  return (height / baseScreenHeight) * size;
}

export function responsiveScale(size: number) {
  return (width / baseScreenWidth) * size;
}
