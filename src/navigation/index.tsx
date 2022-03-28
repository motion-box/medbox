import React, {useEffect} from 'react';
import {
  Platform,
  Dimensions,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {globalSlice} from '../store/reducers/GlobalSlice';
import {hasNotch} from 'react-native-device-info';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import WelcomeNavigator from './WelcomeNavigator';
import SplashScreen from '../screens/splash_screen';
import SettingsScreen from '../screens/user_stack/settings_screen';

// home stack
import SearchScreen from '../screens/home_stack/search_screen';
// consultation stack
import ImplantScreen from '../screens/consultation_stack/implant_screen';
import VideoScreen from '../screens/consultation_stack/video_screen';
// doctor stack
import DoctorScreen from '../screens/doctor_stack/doctor_screen';
// history stack
import HistoryNavigator from './HistoryNavigator';

//
import {colorPalet, fonts} from '../resources/style/globalStyle';
import {ArrowIcon, QRIcon} from '../resources/icons/icons';
import MapScreen from '../screens/map_screen';
import ShowMoreScreen from '../screens/history_stack/show_more_screen';
import PaymentScreen from '../screens/history_stack/payment_screen';
import {paramsSlice} from '../store/reducers/ParamsSlice';
import NewsOverallScreen from '../screens/home_stack/news_overall_screen';
import NewsScreen from '../screens/home_stack/news_screen';

const {width, height} = Dimensions.get('window');

const Stack = createStackNavigator();

export const NavigatorTypes = {
  stacks: {
    splashScreen: 'SplashScreen',
    welcomeStack: 'WelcomeStack',
    mainStack: 'MainStack',
    settingsScreen: 'SettingsScreen',
    historyStack: 'HistoryStack',
    showMoreScreen: 'ShowMoreScreen',
    mapScreen: 'MapScreen',
    paymentScreen: 'PaymentScreen',
  },
  homeStack: {
    searchScreen: 'SearchScreen',
    newsOverallScreen: 'NewsOverallScreen',
    newsScreen: 'NewsScreen',
  },
  consultationStack: {
    inmplantScreen: 'ImplantScreen',
    videoScreen: 'VideoScreen',
  },
  doctorStack: {
    doctorScreen: 'DoctorScreen',
  },
};

const RootNavigator = () => {
  const dispatch = useAppDispatch();
  const {registerId} = useAppSelector(state => state.paramsReducer);
  const {setQr} = paramsSlice.actions;
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

  const onQrPress = () => {
    dispatch(setQr(true));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={NavigatorTypes.stacks.splashScreen}>
        <Stack.Screen
          name={NavigatorTypes.stacks.splashScreen}
          component={SplashScreen}
        />
        <Stack.Screen
          name={NavigatorTypes.stacks.welcomeStack}
          component={WelcomeNavigator}
        />
        <Stack.Screen
          name={NavigatorTypes.stacks.mainStack}
          component={TabNavigator}
        />
        <Stack.Screen
          name={NavigatorTypes.stacks.settingsScreen}
          component={SettingsScreen}
        />
        <Stack.Screen
          name={NavigatorTypes.stacks.mapScreen}
          component={MapScreen}
          options={{gestureEnabled: false}}
        />

        {/* Home stack */}
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen
            name={NavigatorTypes.homeStack.searchScreen}
            component={SearchScreen}
            options={{presentation: 'transparentModal'}}
          />
          <Stack.Screen
            name={NavigatorTypes.homeStack.newsOverallScreen}
            component={NewsOverallScreen}
            options={{presentation: 'transparentModal'}}
          />
          <Stack.Screen
            name={NavigatorTypes.homeStack.newsScreen}
            component={NewsScreen}
          />
        </Stack.Group>

        {/* Consultation stack */}
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen
            name={NavigatorTypes.consultationStack.inmplantScreen}
            component={ImplantScreen}
            options={{presentation: 'transparentModal'}}
          />
          <Stack.Screen
            name={NavigatorTypes.consultationStack.videoScreen}
            component={VideoScreen}
          />
        </Stack.Group>

        {/* Doctor stack */}
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen
            name={NavigatorTypes.doctorStack.doctorScreen}
            component={DoctorScreen}
          />
        </Stack.Group>

        {/* History stack */}
        <Stack.Group>
          <Stack.Screen
            name={NavigatorTypes.stacks.historyStack}
            component={HistoryNavigator}
            options={{
              headerShown: true,
              cardStyle: {backgroundColor: colorPalet.bgColor},
              headerStyle: {
                height: hasNotch() ? 134 : 110,
                backgroundColor: colorPalet.bgColor,
                shadowColor: 'transparent',
                elevation: 0,
              },
              headerLeft: props => (
                <TouchableOpacity
                  onPress={props.onPress}
                  style={{
                    height: 50,
                    width: 50,
                    backgroundColor: '#fff',
                    marginLeft: 20,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ArrowIcon rotate="90" />
                </TouchableOpacity>
              ),
              headerRight: props => (
                <TouchableOpacity
                  onPress={onQrPress}
                  style={{
                    height: 50,
                    width: 50,
                    backgroundColor: '#fff',
                    marginRight: 20,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <QRIcon isGradient={true} width="30" height="30" />
                </TouchableOpacity>
              ),
              headerTitle: props => (
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: fonts.sf_semibold,
                    color: colorPalet.black100,
                  }}
                  numberOfLines={1}
                  ellipsizeMode="clip">
                  {`№ ${registerId
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}`}
                </Text>
              ),
            }}
          />
        </Stack.Group>
        <Stack.Screen
          name={NavigatorTypes.stacks.showMoreScreen}
          component={ShowMoreScreen}
        />
        <Stack.Screen
          name={NavigatorTypes.stacks.paymentScreen}
          component={PaymentScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
