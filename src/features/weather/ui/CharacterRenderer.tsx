import React, {useMemo} from 'react';
import NoData from './../../../assets/animation/noData.svg';
import {StyleProp, View, ViewStyle} from 'react-native';
import LottieView from 'lottie-react-native';
import {
  responsiveFontSize,
  responsiveScale,
} from '../../../app/style/responsivePixel';

// interface CharactorRenderer

const characters = {
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

interface CharacterRendererProps {
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 0;
  loop?: boolean;
  autoPlay?: boolean;
  style?: StyleProp<ViewStyle>;
}

const CharacterRenderer: React.FC<CharacterRendererProps> = ({
  type,
  loop,
  autoPlay,
  style,
}) => {
  const defaultStyle: StyleProp<ViewStyle> = useMemo(() => {
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
        source={characters[type].src}
        style={[style, defaultStyle, {flex: 1}]}
      />
    </View>
  ) : (
    <View style={{gap: 10, flex: 1, justifyContent: 'center'}}>
      <NoData
        style={[
          {
            height: '60%',
          },
          style,
        ]}
      />
    </View>
  );
};

export default CharacterRenderer;
