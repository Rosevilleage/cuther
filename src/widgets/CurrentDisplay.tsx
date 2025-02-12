import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

import CharactorRenderer from '../features/weather/ui/CharactorRenderer';

export default function CurrentDisplay() {
  return (
    <View style={styles.mainsection}>
      <View
        style={{
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'black',
          height: 400,
          overflow: 'hidden',
        }}>
        {/* <CharactorRenderer type={0} loop autoPlay /> */}
        <CharactorRenderer type={1} loop autoPlay />
        {/* <CharactorRenderer type={2} loop autoPlay /> */}
        {/* <CharactorRenderer type={3} loop autoPlay /> */}
        {/* <CharactorRenderer type={4} loop autoPlay /> */}
        {/* <CharactorRenderer type={5} loop autoPlay /> */}
        {/* <CharactorRenderer type={6} loop autoPlay /> */}
        {/* <CharactorRenderer type={7} loop autoPlay /> */}
        {/* <CharactorRenderer type={8} loop autoPlay /> */}
      </View>
      <View style={styles.currentInfoContainer}>
        <View
          style={[
            styles.flexOne,
            {
              height: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <Image
            resizeMode="contain"
            source={require('./../../../assets/icons/sun.png')}
            style={{height: 55, flex: 1}}
          />
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text
              style={{
                height: '100%',
                fontSize: 55,
              }}>
              0도
            </Text>
          </View>
        </View>
        <View style={{flex: 1, paddingRight: 10, gap: 5}}>
          <Text style={{textAlign: 'right', fontSize: 20}}>서울 특별시</Text>
          <Text style={{textAlign: 'right'}}>체감 기온 : 0</Text>
          <Text style={{textAlign: 'right'}}>최고: 3도, 최저: 0도</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  flexOne: {
    flex: 1,
  },
  mainsection: {
    backgroundColor: 'white',
  },
  character: {
    flex: 1,
  },
  currentInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 5,
    padding: 15,
  },
});
