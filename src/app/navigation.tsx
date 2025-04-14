import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainDrawerNavigation from './routes/MainDrawer';
import {createStackNavigator} from '@react-navigation/stack';
import ReportScreen from '../pages/main/ReportScreen';
import CharacterInfo from '../pages/CharacterInfo';
import {responsivePixel, responsiveFontSize} from './style/responsivePixel';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ffffff',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#e0e0e0',
          },
          headerTitleStyle: {
            fontSize: responsiveFontSize(18),
            fontWeight: '600',
            color: '#333333',
          },
          headerTitleAlign: 'center',
          headerLeftContainerStyle: {
            paddingLeft: responsivePixel(10),
          },
        }}>
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
