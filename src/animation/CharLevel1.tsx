import React from 'react';
import LottieView from 'lottie-react-native';
import {CharAnimationProp} from './char';

export default function CharLevel1({loop, autoPlay, size}: CharAnimationProp) {
  return (
    <LottieView
      source={require('./../../assets/animation/Circulator.json')}
      autoPlay={autoPlay}
      loop={loop}
      style={{height: size === 'lage' ? 320 : size === 'medium' ? 250 : 150}}
    />
  );
}
