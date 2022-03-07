import React, {useEffect} from 'react';
import {Text, Image} from 'react-native';
import styles from './style';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import {getSecureData} from '../../hooks/localStorage';
import {CommonActions} from '@react-navigation/native';
import {NavigatorTypes} from '../../navigation';
import StatusBarFocus from '../../components/global_components/StatusBarCustom';
import 'moment/locale/ru';
import 'moment/locale/uz-latn';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
// import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: {
    params: {};
  };
}

const SplashScreen = ({navigation}: ScreenProps) => {
  const {i18n} = useTranslation();
  useEffect(() => {
    getSecureData().then((res: any) => {
      if (res.status === 'success') {
        console.log(res);
        if (res.data.language === 'uz') {
          moment.locale('uz-latn');
        } else {
          moment.locale(res.data.language);
        }
        i18n.changeLanguage(res.data.language);
        setTimeout(() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: NavigatorTypes.stacks.mainStack}],
            }),
          );
        }, 2000);
      } else if (res.status === 'empty') {
        setTimeout(() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: NavigatorTypes.stacks.welcomeStack}],
            }),
          );
        }, 2000);
      }
    });

    // request(PERMISSIONS.IOS.MICROPHONE).then(res => {
    //   console.log(res);
    // });
    // request(PERMISSIONS.IOS.CAMERA).then(res => {
    //   console.log(res);
    // });
  }, []);

  return (
    <LinearGradient colors={['#344853', '#1A1B27']} style={styles.container}>
      <StatusBarFocus
        backgroundColor="transparent"
        translucent={true}
        barStyle="light-content"
      />
      <Image source={require('../../resources/images/SplashLogo.png')} />
      <Text style={styles.powered}>MedBox v0.1 beta</Text>
    </LinearGradient>
  );
};

export default SplashScreen;
