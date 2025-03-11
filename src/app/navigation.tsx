import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainScreen from '../pages/main/MainScreen';
import {NavigationContainer} from '@react-navigation/native';

const MainDrawer = createDrawerNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <MainDrawer.Navigator
        initialRouteName="Main"
        screenOptions={{headerTitle: ''}}>
        <MainDrawer.Screen name="Main" component={MainScreen} />
      </MainDrawer.Navigator>
    </NavigationContainer>
  );
}
