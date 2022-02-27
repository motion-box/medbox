import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ImplantScreen from '../screens/consultation_stack/implant_screen';
import VideoScreen from '../screens/consultation_stack/video_screen';

const Stack = createStackNavigator();

export enum ConsultationScreensType {
  inmplantScreen = 'ImplantScreen',
  videoScreen = 'VideoScreen',
}

const ConsultationNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ConsultationScreensType.inmplantScreen}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={ConsultationScreensType.inmplantScreen}
        component={ImplantScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name={ConsultationScreensType.videoScreen}
        component={VideoScreen}
      />
    </Stack.Navigator>
  );
};

export default ConsultationNavigator;
