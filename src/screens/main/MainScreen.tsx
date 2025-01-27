import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import CurrentDisplay from './CurrentDisplay';

export default function MainScreen() {
  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      console.log(latitude, longitude);
    });
  }, []);
  return (
    <ScrollView>
      {/* currentDisplay */}
      <CurrentDisplay />
      {/* 초단기 */}
      {/* <ScrollView horizontal>{}</ScrollView> */}
      {/* 단기 */}
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   container: {},
// });
