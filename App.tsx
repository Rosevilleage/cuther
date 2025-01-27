/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import Navigation from './src/navigation';
import {Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

function App(): React.JSX.Element {
  useEffect(() => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always');
    }
  }, []);
  return <Navigation />;
}

export default App;
