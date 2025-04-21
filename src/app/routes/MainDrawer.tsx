import React from 'react';
import MainScreen from '../../pages/main/MainScreen';
import {
  createDrawerNavigator,
  DrawerToggleButton,
} from '@react-navigation/drawer';
import InfoScreen from '../../pages/InfoScreen';
import {responsivePixel} from '../style/responsivePixel';
import {TouchableOpacity} from 'react-native';
import {useQueryClient} from '@tanstack/react-query';
import ResetIcon from './../../assets/icons/svg/reset.svg';
const MainDrawer = createDrawerNavigator();

export default function MainDrawerNavigation() {
  const queryClient = useQueryClient();
  const resetButton = () => {
    return (
      <TouchableOpacity
        style={{marginLeft: 20}}
        onPress={() => {
          queryClient.invalidateQueries();
          queryClient.resetQueries();
        }}>
        <ResetIcon />
      </TouchableOpacity>
    );
  };
  return (
    <MainDrawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitle: '',
        drawerPosition: 'right',
        headerLeft: () => resetButton(),
        headerRight: DrawerToggleButton,
        drawerStyle: {
          width: '70%',
          backgroundColor: '#f5f5f5',
        },
        drawerItemStyle: {
          paddingVertical: responsivePixel(5),
          paddingHorizontal: responsivePixel(16),
          borderRadius: responsivePixel(8),
          marginVertical: responsivePixel(4),
        },
        drawerActiveTintColor: '#040404',
        drawerInactiveTintColor: '#636363',
        drawerLabelStyle: {
          fontSize: responsivePixel(16),
          fontWeight: '600',
        },
      }}>
      <MainDrawer.Screen
        name="Home"
        component={MainScreen}
        options={{
          title: '홈',
        }}
      />
      <MainDrawer.Screen
        name="Info"
        component={InfoScreen}
        options={{
          title: '앱 정보',
        }}
      />
    </MainDrawer.Navigator>
  );
}
