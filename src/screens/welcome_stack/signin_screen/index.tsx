import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import HeaderStatic from '../../../components/global_components/header_static';
import WrapperGradient from '../../../components/welcome_screens_components/wrapper_gradient';
import styles from './style';
import Input from '../../../components/global_components/input';
import Button from '../../../components/global_components/button';
import {useTranslation} from 'react-i18next';
import {WelcomeScreensType} from '../../../navigation/WelcomeNavigator';
import OneidBox from '../../../components/welcome_screens_components/oneid_box';
import MessageModal, {
  MessageModalTypes,
} from '../../../components/global_components/modal/message_modal';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {paramsSlice} from '../../../store/reducers/ParamsSlice';
import {userAPI} from '../../../services/UserService';
import DialogPopup from '../../../components/global_components/dialog_popup';
import {TFunctionResult} from 'i18next';
import {storeSecureData} from '../../../hooks/localStorage';
import {NavigatorTypes} from '../../../navigation';
import {userSlice} from '../../../store/reducers/UserSlice';
import {classifiersAPI} from '../../../services/ClassifiersService';
import {classifiersSlice} from '../../../store/reducers/ClassifiersSlice';
import {sortRegister} from '../../../hooks/registerSorter';
import {CommonActions} from '@react-navigation/native';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
}

const SigninScreen = ({navigation}: ScreenProps) => {
  const {t} = useTranslation();

  // default error modal params
  const defaultError = {
    title: t('global_error_title'),
    description: t('global_error_description'),
    btn: {
      text: t('ok'),
      onPress: () => {
        setErrorModal(false);
      },
    },
  };
  const nouserError: MessageModalTypes = {
    title: t('error_login_user_not_found_title'),
    description: t('error_login_user_not_found_description'),
    closeBtn: {
      onPress: () => setErrorModal(false),
    },
    btn: {
      text: t('register_now'),
      onPress: () => {
        setErrorModal(false);
        navigation.navigate(WelcomeScreensType.signupScreen);
      },
    },
  };
  const passwordError: MessageModalTypes = {
    title: t('error_login_password_not_matched_title'),
    description: t('error_login_password_not_matched_description'),
    btn: {
      text: t('ok'),
      onPress: () => {
        setPassError(true);
        setErrorModal(false);
      },
    },
  };

  // states
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const [passError, setPassError] = useState(false);
  const [dialogText, setDialogText] = useState<false | TFunctionResult>(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorParams, setErrorParams] =
    useState<MessageModalTypes>(defaultError);

  // redux side
  const dispatch = useAppDispatch();
  const {setLoading} = paramsSlice.actions;
  const {setSpecialitiesList} = classifiersSlice.actions;
  const {setAccessData, setUserData, setUserRegisters} = userSlice.actions;
  const {lang} = useAppSelector(state => state.globalReducer);
  const [login] = userAPI.useLoginMutation();
  const [getSpecialities] = classifiersAPI.useGetSpecialityMutation();
  const [getUserRegisters] = userAPI.useGetUserRegistersMutation();

  const setPassFunc = (text: string) => {
    if (passError) setPassError(false);
    setPass(text.replace(/\s/g, ''));
  };

  const loginPress = async () => {
    if (!phone || !pass) {
      setDialogText(t('fill_warn'));
      return;
    }
    if (phone.length < 9) {
      setDialogText(t('invalid_phone_number'));
      return;
    }
    if (pass.length < 8) {
      setDialogText(t('minimum_pass_characters'));
      setPassError(true);
      return;
    }
    dispatch(setLoading(true));
    login({
      phone_number: `+998${phone}`,
      password: pass,
    })
      .unwrap()
      .then(payload => {
        if (payload.token) {
          storeSecureData(payload, lang);
          dispatch(
            setAccessData({
              id: payload.user.id,
              token: payload.token,
              phone_number: payload.user.phone_number,
            }),
          );
          dispatch(setUserData(payload.user));
          getSpecialities({token: payload.token})
            .unwrap()
            .then(getSpecialities => {
              dispatch(setSpecialitiesList(getSpecialities));
              getUserRegisters({
                userId: payload.user.id,
                token: payload.token,
              })
                .unwrap()
                .then(registers => {
                  const sorted = sortRegister(registers);
                  dispatch(setUserRegisters({...sorted}));
                  dispatch(setLoading(false));
                  setTimeout(() => {
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [{name: NavigatorTypes.stacks.mainStack}],
                      }),
                    );
                  }, 400);
                })
                .catch(e => {
                  console.log('Register error: ', e);
                });
            })
            .catch(error => {
              dispatch(setLoading(false));
              setErrorParams(defaultError);
              setTimeout(() => {
                setErrorModal(true);
              }, 1000);
            });
        }
      })
      .catch(error => {
        console.log('sign in error: ', error);
        dispatch(setLoading(false));
        if (error.data.detail === 'User not found.') {
          setErrorParams(nouserError);
        }
        if (error.data.detail === 'Password not matched.') {
          setErrorParams(passwordError);
        }
        setTimeout(() => {
          setErrorModal(true);
        }, 1000);
      });
  };

  return (
    <WrapperGradient>
      <HeaderStatic
        options={{
          leftButton: {
            background: 'white50',
            icon: 'ArrowIcon',
            iconColor: 'white100',
            iconRotate: 90,
            press: () => navigation.goBack(),
          },
        }}
      />
      <View style={styles.container}>
        <View style={{marginHorizontal: 20}}>
          <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
            {t('sign_in_title')}
          </Text>
          <Text style={styles.subtitle}>{t('sign_in_description')}</Text>
          <View style={{height: 20}} />
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={styles.phone_region_cont}>
              <Text style={styles.phone_region_text}>+998</Text>
            </View>
            <View style={{width: 10}} />
            <View style={{flex: 1}}>
              <Input
                text={phone}
                setText={setPhone}
                placeholder={t('phone_number')}
                options={{type: 'number-pad', maxLength: 9}}
              />
            </View>
          </View>
          <View style={{height: 10}} />
          <Input
            text={pass}
            setText={setPassFunc}
            placeholder={t('password')}
            options={{
              type: 'default',
              secure: true,
              icon: 'EyeOffIcon',
              error: passError,
            }}
          />
          <TouchableOpacity
            style={styles.recover_button}
            onPress={() =>
              navigation.navigate(WelcomeScreensType.restoreScreen)
            }>
            <Text style={styles.subtitle}>{t('recovery_password')}</Text>
          </TouchableOpacity>
          <Button
            text={t('sign_in')}
            onPress={loginPress}
            options={{
              buttonWidth: '100%',
              buttonHeight: 50,
              textSize: 14,
              borderRadius: 10,
            }}
          />
          <OneidBox />
        </View>
        <View style={styles.link_cont}>
          <Text style={styles.link_description}>{t('not_a_member')}</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(WelcomeScreensType.signupScreen)
            }>
            <Text style={styles.link_style}>{t('register_now')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <MessageModal isVisible={errorModal} {...errorParams} />
      {dialogText && <DialogPopup text={dialogText} setText={setDialogText} />}
    </WrapperGradient>
  );
};

export default SigninScreen;
