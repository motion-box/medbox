import React from 'react';
import {View, SafeAreaView} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import {colorPalet} from '../../../resources/style/globalStyle';
import WelcomeCarousel from '../../../components/welcome_screens_components/welcome_carousel';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Button from '../../../components/global_components/button';
import {useAppSelector} from '../../../hooks/redux';
import {WelcomeScreensType} from '../../../navigation/WelcomeNavigator';
import {useTranslation} from 'react-i18next';
import WrapperGradient from '../../../components/welcome_screens_components/wrapper_gradient';

const data = [
  {
    id: 0,
    imageUrl: '',
    title: 'Take care of your Health',
    description:
      'You can find the doctor you need and consult with him about your health problems',
  },
  {
    id: 1,
    imageUrl: '',
    title: 'Dont take of your Health',
    description:
      'You can find the doctor you need and consult with him about your health problems',
  },
  {
    id: 2,
    imageUrl: '',
    title: 'All care of your Head',
    description:
      'You can find the doctor you need and consult with him about your health problems',
  },
  {
    id: 3,
    imageUrl: '',
    title: 'Take care of your Mouth',
    description:
      'You can find the doctor you need and consult with him about your health problems',
  },
];

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
}

const WelcomeScreen = ({navigation}: ScreenProps) => {
  const {t} = useTranslation();

  const navTo = (screen: WelcomeScreensType) => {
    navigation.navigate(screen);
  };

  return (
    <WrapperGradient>
      <WelcomeCarousel data={data} />
      <View style={styles.buttons_cont}>
        <Button
          text={t('sign_up')}
          onPress={() => navTo(WelcomeScreensType.signupScreen)}
          options={{
            color: 'black100',
            buttonFlex: 1,
            buttonHeight: 40,
            textSize: 14,
          }}
        />
        <View style={{width: 5}} />
        <Button
          text={t('sign_in')}
          onPress={() => navTo(WelcomeScreensType.signinScreen)}
          options={{
            color: 'white100',
            textColor: 'black100',
            buttonFlex: 1,
            buttonHeight: 40,
            textSize: 14,
          }}
        />
      </View>
    </WrapperGradient>
  );
};

export default WelcomeScreen;
