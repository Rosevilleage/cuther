import React from 'react';
import {ScrollView} from 'react-native';

import CurrentDisplay from './CurrentDisplay';

export default function MainScreen() {
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
