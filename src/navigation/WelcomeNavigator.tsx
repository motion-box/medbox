import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../screens/welcome_stack/welcome_screen';
import VerifyScreen from '../screens/welcome_stack/verify_screen';
import SignupScreen from '../screens/welcome_stack/signup_screen';
import SigninScreen from '../screens/welcome_stack/signin_screen';
import UserFormScreen from '../screens/welcome_stack/userform_screen';
import LanguageScreen from '../screens/welcome_stack/language_screen';
import RestoreScreen from '../screens/welcome_stack/restore_screen';
import NewPasswordScreen from '../screens/welcome_stack/newpassword_screen';

const Stack = createStackNavigator();

export enum WelcomeScreensType {
  languageScreen = 'LanguageScreen',
  welcomeScreen = 'WelcomeScreen',
  verifyScreen = 'VerifyScreen',
  signupScreen = 'SignupScreen',
  signinScreen = 'SigninScreen',
  userformScreen = 'UserFormScreen',
  restoreScreen = 'RestoreScreen',
  newpasswordScreen = 'NewpasswordScreen',
}

const WelcomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'transparentModal',
      }}>
      <Stack.Screen
        name={WelcomeScreensType.languageScreen}
        component={LanguageScreen}
      />
      <Stack.Screen
        name={WelcomeScreensType.welcomeScreen}
        component={WelcomeScreen}
      />
      <Stack.Screen
        name={WelcomeScreensType.verifyScreen}
        component={VerifyScreen}
      />
      <Stack.Screen
        name={WelcomeScreensType.signupScreen}
        component={SignupScreen}
      />
      <Stack.Screen
        name={WelcomeScreensType.signinScreen}
        component={SigninScreen}
      />
      <Stack.Screen
        name={WelcomeScreensType.userformScreen}
        component={UserFormScreen}
      />
      <Stack.Screen
        name={WelcomeScreensType.restoreScreen}
        component={RestoreScreen}
      />
      <Stack.Screen
        name={WelcomeScreensType.newpasswordScreen}
        component={NewPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default WelcomeNavigator;
