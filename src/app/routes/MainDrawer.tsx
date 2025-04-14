import React from 'react';
import MainScreen from '../../pages/main/MainScreen';
import {
  createDrawerNavigator,
  DrawerToggleButton,
} from '@react-navigation/drawer';
import InfoScreen from '../../pages/InfoScreen';

const MainDrawer = createDrawerNavigator();
export default function MainDrawerNavigation() {
  return (
    <MainDrawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitle: '',
        drawerPosition: 'right',
        headerLeft: () => undefined,
        headerRight: DrawerToggleButton,
      }}>
      <MainDrawer.Screen name="Home" component={MainScreen} />
      <MainDrawer.Screen name="Info" component={InfoScreen} />
    </MainDrawer.Navigator>
  );
}
