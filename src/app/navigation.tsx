import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainDrawerNavigation from './routes/MainDrawer';
import {createStackNavigator} from '@react-navigation/stack';
import ReportScreen from '../pages/main/ReportScreen';
import CharacterInfo from '../pages/CharacterInfo';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainDrawerNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Report"
          component={ReportScreen}
          options={{
            headerShown: true,
            title: '특보 정보',
          }}
        />
        <Stack.Screen
          name="CharacterInfo"
          component={CharacterInfo}
          options={{
            headerShown: true,
            title: '캐릭터 설명',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
