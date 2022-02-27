import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DoctorScreen from '../screens/doctor_stack/doctor_screen';

const Stack = createStackNavigator();

export enum DoctorScreensType {
  doctorScreen = 'DoctorScreen',
}

const DoctorNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'transparentModal',
      }}>
      <Stack.Screen
        name={DoctorScreensType.doctorScreen}
        component={DoctorScreen}
      />
    </Stack.Navigator>
  );
};

export default DoctorNavigator;
