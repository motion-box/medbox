import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from '../screens/home_stack/search_screen';

const Stack = createStackNavigator();

export enum HomeScreensType {
  searchScreen = 'SearchScreen',
}

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={HomeScreensType.searchScreen}
      screenOptions={{
        headerShown: false,
        presentation: 'transparentModal',
      }}>
      <Stack.Screen
        name={HomeScreensType.searchScreen}
        component={SearchScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
