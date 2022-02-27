import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as Icons from '../resources/icons/icons';
import TabbarButton from '../components/global_components/tabbar_button';
import RegisterScreen from '../screens/register_stack/register_screen';
import ConsultationScreen from '../screens/consultation_stack/consultation_screen';
import AccountScreen from '../screens/user_stack/account_screen';
import {useAppSelector} from '../hooks/redux';
import HomeNavigator from './HomeNavigator';
import {StyleSheet} from 'react-native';
import HomeScreen from '../screens/home_stack/home_screen';

const Tab = createBottomTabNavigator();

interface Itabs {
  id: string;
  name: string;
  component: any;
  icon: Icons.AllIconsType;
}
interface ItabsArr extends Array<Itabs> {}

const tabs: ItabsArr = [
  {
    id: '0',
    name: 'HomeScreen',
    component: HomeScreen,
    icon: 'HomeSmileIcon',
  },
  {
    id: '1',
    name: 'RegisterScreen',
    component: RegisterScreen,
    icon: 'ClipboardIcon',
  },
  {
    id: '2',
    name: 'ConsultationScreen',
    component: ConsultationScreen,
    icon: 'VideoIcon',
  },
  {
    id: '3',
    name: 'AccountScreen',
    component: AccountScreen,
    icon: 'EmpathizeIcon',
  },
];

const TabNavigator = () => {
  const {screen, bottomTabVisible} = useAppSelector(
    state => state.globalReducer,
  );
  return (
    <Tab.Navigator
      initialRouteName={tabs[0].name}
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: [
          {
            display: bottomTabVisible ? 'flex' : 'none',
            bottom: screen.hasNotch ? 33 : 20,
          },
          tabbarStyle.style,
        ],
      })}>
      {tabs.map(item => {
        return (
          <Tab.Screen
            key={item.id}
            name={item.name}
            component={item.component}
            options={{
              tabBarButton: props => {
                return (
                  <TabbarButton
                    icon={item.icon}
                    onPress={props.onPress}
                    focused={props.accessibilityState?.selected}
                  />
                );
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const tabbarStyle = StyleSheet.create({
  style: {
    opacity: 1,
    backgroundColor: 'white',
    position: 'absolute',
    height: 60,
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 5,
    paddingHorizontal: 2.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default TabNavigator;
