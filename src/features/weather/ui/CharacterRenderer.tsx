import React, {useMemo} from 'react';
import NoData from './../../../assets/animation/noData.svg';
import {StyleProp, Text, View, ViewStyle} from 'react-native';
import LottieView from 'lottie-react-native';
import {
  responsiveFontSize,
  responsiveScale,
} from '../../../app/style/responsivePixel';

// interface CharactorRenderer

const charactors = {
  0: {src: ''},
  1: {src: require('./../../../assets/animation/Circulator.json')},
  2: {src: require('./../../../assets/animation/lev-char-half.json')},
  3: {src: require('./../../../assets/animation/cherry blossoms.json')},
  4: {src: require('./../../../assets/animation/headphone.json')},
  5: {src: require('./../../../assets/animation/chair.json')},
  6: {src: require('./../../../assets/animation/trench.json')},
  7: {src: require('./../../../assets/animation/coat.json')},
  8: {src: require('./../../../assets/animation/cold.json')},
};

export default function CharacterRenderer({
  type,
  loop,
  autoPlay,
}: {
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 0;
  loop?: boolean;
  autoPlay?: boolean;
}) {
  // {height: size === 'lage' ? 320 : size === 'medium' ? 250 : 150};
  const style: StyleProp<ViewStyle> = useMemo(() => {
    switch (type) {
      case 2:
        return {
          transform: [{scale: responsiveScale(1.6)}],
        };
      case 3:
        return {
          transform: [{scale: responsiveScale(1.3)}],
        };
      case 4:
        return {
          transform: [
            {scale: responsiveScale(2)},
            {translateX: responsiveFontSize(13)},
          ],
        };
      case 5:
        return {
          transform: [{scale: responsiveScale(1.6)}],
        };
      case 6:
        return {
          transform: [{scale: responsiveScale(1.3)}],
        };
      case 7:
        return {
          transform: [{scale: responsiveScale(1.1)}],
        };
      case 8:
        return {
          transform: [{scale: responsiveScale(1.1)}],
        };
      default:
        return {};
    }
  }, [type]);
  return type !== 0 ? (
    <View style={{flex: 1}}>
      <LottieView
        loop={loop}
        autoPlay={autoPlay}
        source={charactors[type].src}
        style={[style, {flex: 1}]}
      />
    </View>
  ) : (
    <View style={{gap: 10, flex: 1, justifyContent: 'center'}}>
      <NoData
        style={{
          height: '60%',
        }}
      />
      <Text style={{fontSize: responsiveFontSize(30), textAlign: 'center'}}>
        데이터가 없습니다.
      </Text>
    </View>
  );
}
