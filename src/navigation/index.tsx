import React, {useEffect} from 'react';
import {Platform, Dimensions, StatusBar} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {useAppDispatch} from '../hooks/redux';
import {globalSlice} from '../store/reducers/GlobalSlice';
import {hasNotch} from 'react-native-device-info';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import WelcomeNavigator from './WelcomeNavigator';
import HomeNavigator from './HomeNavigator';
import SplashScreen from '../screens/splash_screen';
import ConsultationNavigator from './ConsultationNavigator';
import {navigationRef} from '../hooks/navigationRef';
import DoctorNavigator from './DoctorNavigator';
import SettingsScreen from '../screens/user_stack/settings_screen';

const {width, height} = Dimensions.get('window');

const Stack = createStackNavigator();

export enum RootNavigatorTypes {
  splashScreen = 'SplashScreen',
  welcomeStack = 'WelcomeStack',
  mainStack = 'MainStack',
  homeStack = 'HomeStack',
  consultationStack = 'ConsultationStack',
  doctorStack = 'DoctorStack',
  settingsScreen = 'SettingsScreen',
}

const RootNavigator = () => {
  const dispatch = useAppDispatch();
  const {setScreenParams, setOS} = globalSlice.actions;

  useEffect(() => {
    dispatch(
      setScreenParams({
        width,
        height,
        hasNotch: hasNotch(),
        headerSize: StatusBar.currentHeight || null,
      }),
    );
    dispatch(setOS(Platform.OS as 'android' | 'ios'));
  }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="SplashScreen"
        defaultScreenOptions={{
          presentation: 'transparentModal',
        }}>
        <Stack.Screen
          name={RootNavigatorTypes.splashScreen}
          component={SplashScreen}
        />
        <Stack.Screen
          name={RootNavigatorTypes.welcomeStack}
          component={WelcomeNavigator}
        />
        <Stack.Screen
          name={RootNavigatorTypes.mainStack}
          component={TabNavigator}
        />
        <Stack.Screen
          name={RootNavigatorTypes.homeStack}
          component={HomeNavigator}
          options={{
            presentation: 'transparentModal',
          }}
        />
        <Stack.Screen
          name={RootNavigatorTypes.consultationStack}
          component={ConsultationNavigator}
          options={{
            presentation: 'transparentModal',
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name={RootNavigatorTypes.doctorStack}
          component={DoctorNavigator}
        />
        <Stack.Screen
          name={RootNavigatorTypes.settingsScreen}
          component={SettingsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
