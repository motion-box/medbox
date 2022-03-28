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
import {userAPI} from '../../services/UserService';
import {userSlice} from '../../store/reducers/UserSlice';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {globalSlice} from '../../store/reducers/GlobalSlice';
import {classifiersAPI} from '../../services/ClassifiersService';
import {classifiersSlice} from '../../store/reducers/ClassifiersSlice';
import {sortRegister} from '../../hooks/registerSorter';
// import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: {
    params: {};
  };
}

const SplashScreen = ({navigation}: ScreenProps) => {
  const {i18n} = useTranslation();
  const dispatch = useAppDispatch();
  const {setAppLanguage} = globalSlice.actions;
  const {setUserData, setAccessData, setUserRegisters} = userSlice.actions;
  const {setSpecialitiesList} = classifiersSlice.actions;
  const [getUser] = userAPI.useGetUserDataMutation();
  const [getSpecialities] = classifiersAPI.useGetSpecialityMutation();
  const [getUserRegisters] = userAPI.useGetUserRegistersMutation();
  const [getNews] = classifiersAPI.useGetNewsMutation();

  useEffect(() => {
    getSecureData().then((localRes: any) => {
      if (localRes.status === 'success') {
        if (localRes.data.language === 'uz') {
          moment.locale('uz-latn');
        } else {
          moment.locale(localRes.data.language);
        }
        i18n.changeLanguage(localRes.data.language);
        dispatch(setAppLanguage(localRes.data.language));
        dispatch(
          setAccessData({
            id: localRes.data.id,
            token: localRes.data.token,
            phone_number: localRes.data.phone_number,
          }),
        );
        getSpecialities({token: localRes.data.token})
          .unwrap()
          .then(getSpecialities => {
            dispatch(setSpecialitiesList(getSpecialities));
            getUser({id: localRes.data.id, token: localRes.data.token})
              .unwrap()
              .then(res => {
                dispatch(setUserData(res));
                getUserRegisters({
                  userId: localRes.data.id,
                  token: localRes.data.token,
                })
                  .unwrap()
                  .then(registers => {
                    const sorted = sortRegister(registers);
                    dispatch(setUserRegisters({...sorted}));
                    setTimeout(() => {
                      navigation.dispatch(
                        CommonActions.reset({
                          index: 0,
                          routes: [{name: NavigatorTypes.stacks.mainStack}],
                        }),
                      );
                    }, 2000);
                  })
                  .catch(e => {
                    console.log('Register error: ', e);
                  });
              })
              .catch(e => {
                console.log(e);
              });
          })
          .catch(e => {
            console.log(e);
          });
      } else if (localRes.status === 'empty') {
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
