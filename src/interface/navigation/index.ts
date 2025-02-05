import {createDrawerNavigator} from '@react-navigation/drawer';
import MainScreen from './../screens/main/MainScreen';
import {createStaticNavigation} from '@react-navigation/native';

const MainDrawer = createDrawerNavigator({
  screens: {
    Main: {screen: MainScreen, options: {headerTitle: ''}},
  },
  initialRouteName: 'Main',
});
export default createStaticNavigation(MainDrawer);
