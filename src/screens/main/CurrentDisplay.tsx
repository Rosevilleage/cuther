import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import CharLevel1 from '../../animation/CharLevel1';

export default function CurrentDisplay() {
  return (
    <View style={styles.mainsection}>
      <View>
        <CharLevel1 autoPlay loop size="lage" />
      </View>
      <View style={styles.currentInfoContainer}>
        <View
          style={[
            styles.flexOne,
            {flexDirection: 'row', alignItems: 'center'},
          ]}>
          <Image
            resizeMode="contain"
            source={require('./../../../assets/icons/sun.png')}
            style={{height: 55, flex: 1}}
          />
          <Text style={{flex: 1, fontSize: 55}}>0도</Text>
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
