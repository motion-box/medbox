import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInputChangeEventData,
  NativeSyntheticEvent,
  TextInput,
} from 'react-native';
import styles from './style';
import {useTranslation} from 'react-i18next';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import HeaderStatic from '../../../components/global_components/header_static';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';
import Button from '../../../components/global_components/button';
import WrapperGradient from '../../../components/welcome_screens_components/wrapper_gradient';
import {WelcomeScreensType} from '../../../navigation/WelcomeNavigator';
import {userAPI} from '../../../services/UserService';
import MessageModal, {
  MessageModalTypes,
} from '../../../components/global_components/modal/message_modal';
import {useAppDispatch} from '../../../hooks/redux';
import {paramsSlice} from '../../../store/reducers/ParamsSlice';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: {
    params: {
      styled_phone: string;
      phone: string;
      password: string;
      smsType: 'register' | 'restore';
    };
  };
}

let time = 60;
const VerifyScreen = ({navigation, route}: ScreenProps) => {
  const {t} = useTranslation();
  const {styled_phone, phone, password, smsType} = route.params;

  const defaultError = {
    title: t('global_error_title'),
    description: t('global_error_description'),
    btn: {
      text: t('ok'),
      onPress: () => {
        setWarningModal(false);
      },
    },
  };
  const codeError = {
    title: t('error_wrong_code_title'),
    description: t('error_wrong_code_description'),
    btn: {
      text: t('ok'),
      onPress: () => {
        setWarningModal(false);
      },
    },
  };

  // states
  const [number, setNumber] = useState('-----');
  const [timer, setTimer] = useState(60);
  const [warningModal, setWarningModal] = useState(false);
  const [warningParams, setWarningParams] =
    useState<MessageModalTypes>(defaultError);
  const checkSuccess = useRef(false);

  //redux side
  const dispatch = useAppDispatch();
  const {setLoading} = paramsSlice.actions;
  const [checkRegisterSms] = userAPI.useCheckSmsOnRegisterMutation();
  const [sendRegisterSms] = userAPI.useSendSmsOnRegisterMutation();
  const [checkRestoreSms] = userAPI.useCheckSmsOnRestoreMutation();
  const [sendRestoreSms] = userAPI.useSendSmsOnRestoreMutation();

  useEffect(() => {
    navigation.addListener('focus', e => {
      if (checkSuccess.current) {
        checkSuccess.current = false;
      }
    });
    navigation.addListener('beforeRemove', e => {
      if (checkSuccess.current) {
        return;
      }
      e.preventDefault();
      goBack(e);
    });

    const timerInterval = setInterval(() => {
      if (time === 0) return;
      setTimer(time - 1);
      time = time - 1;
    }, 1000);
    return () => {
      navigation.removeListener('beforeRemove', e => {
        console.log('removed beforeRemove listener');
        e.preventDefault();
      });
      navigation.removeListener('focus', e => {
        console.log('removed focus listener');
      });
      clearInterval(timerInterval);
    };
  }, []);

  useEffect(() => {
    if (number.length < 1) setNumber('-----');
  }, [number]);

  const typeNumbers = async (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setNumber(e.nativeEvent.text);
    if (e.nativeEvent.text.length === 5) {
      dispatch(setLoading(true));
      if (smsType === 'register') {
        autoCheckRegisterSms(e.nativeEvent.text);
      } else if (smsType === 'restore') {
        autoCheckRestoreSms(e.nativeEvent.text);
      }
    }
  };

  const autoCheckRegisterSms = (number: string) => {
    checkRegisterSms({
      phone_number: phone,
      code: number,
    })
      .unwrap()
      .then(payload => {
        if (payload.ok) {
          checkSuccess.current = true;
          dispatch(setLoading(false));
          setTimeout(() => {
            navigation.navigate(WelcomeScreensType.userformScreen, {
              styled_phone: styled_phone,
              phone: phone,
              password: password,
              code: number,
            });
          }, 500);
        }
      })
      .catch(error => {
        console.log('error verify screen: ', error);
        dispatch(setLoading(false));
        setTimeout(() => {
          setWarningParams(codeError);
          setWarningModal(true);
        }, 1000);
      });
  };

  const autoCheckRestoreSms = (number: string) => {
    checkRestoreSms({
      phone_number: phone,
      code: number,
    })
      .unwrap()
      .then(payload => {
        if (payload.ok) {
          checkSuccess.current = true;
          dispatch(setLoading(false));
          setTimeout(() => {
            navigation.navigate(WelcomeScreensType.newpasswordScreen, {
              styled_phone: styled_phone,
              phone: phone,
              password: password,
              code: number,
            });
          }, 500);
        }
      })
      .catch(error => {
        console.log('error verify screen: ', error);
        dispatch(setLoading(false));
        setTimeout(() => {
          setWarningParams(codeError);
          setWarningModal(true);
        }, 1000);
      });
  };

  const requestAgain = () => {
    if (timer !== 0) return;
    setWarningParams({
      title: t('global_warning_title'),
      description: t('warning_resend_again'),
      closeBtn: {
        onPress: () => setWarningModal(false),
      },
      btn: {
        text: t('verify_request_again'),
        onPress: () => {
          setWarningModal(false);
          dispatch(setLoading(true));
          setTimeout(() => {
            resendCode();
          }, 500);
        },
      },
    });
    setWarningModal(true);
  };

  const resendCode = () => {
    // on register resend
    if (smsType === 'register') {
      sendRegisterSms({
        phone_number: phone,
        password: password,
      })
        .unwrap()
        .then(payload => {
          if (payload.ok) {
            console.log(payload);
            dispatch(setLoading(false));
            upgradeTimer();
          }
        })
        .catch(error => ErrorOnCodeResend(error));
    }
    // on verify resend
    else if (smsType === 'restore') {
      sendRestoreSms({
        phone_number: phone,
      })
        .unwrap()
        .then(payload => {
          if (payload.ok) {
            console.log(payload);
            dispatch(setLoading(false));
            upgradeTimer();
          }
        })
        .catch(error => ErrorOnCodeResend(error));
    }
  };

  // error on resending code
  const ErrorOnCodeResend = (error: any) => {
    console.log('error:', error);
    setTimeout(() => {
      dispatch(setLoading(false));
      setWarningParams(defaultError);
      setTimeout(() => {
        setWarningModal(true);
      }, 500);
    }, 500);
  };

  const upgradeTimer = () => {
    setTimer(60);
    time = 60;
  };

  const goBack = (e: any) => {
    // default error modal params
    const defaultWarning = {
      title: t('global_warning_title'),
      description: t('warning_already_sent_message_go_back'),
      closeBtn: {
        onPress: () => setWarningModal(false),
      },
      btn: {
        text: t('go_back_anyway'),
        onPress: () => {
          setWarningModal(false);
          navigation.dispatch(e.data.action);
        },
      },
    };
    setWarningParams(defaultWarning);
    setWarningModal(true);
  };

  const Tab = ({num}: {num: string}) => (
    <View style={styles.tab}>
      <Text
        style={{
          fontSize: 24,
          color: !number.includes('-')
            ? colorPalet.black100
            : colorPalet.black50,
          fontFamily: fonts.sf_medium,
        }}>
        {num}
      </Text>
    </View>
  );
  const mapTabs = [0, 1, 2, 3, 4].map(item => {
    return <Tab key={item} num={number[item]} />;
  });

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
        <View>
          <Text style={[styles.title, {marginHorizontal: 20}]}>
            {t('verify_title')}
          </Text>
          <Text style={styles.subtitle}>
            {t('verify_description')} {styled_phone}
          </Text>
          <View style={{marginHorizontal: 20, marginTop: 20}}>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              maxLength={5}
              onChange={typeNumbers}
            />
            <View pointerEvents="none" style={styles.input_container}>
              {mapTabs}
            </View>
          </View>
        </View>
        <View style={{marginBottom: 20, marginHorizontal: 20}}>
          <Text style={styles.question_text}>
            {`${t('verify_dont_receive_code')} ${
              timer !== 0 ? `(0:${timer < 10 ? `0${timer}` : timer})` : ''
            }`}
          </Text>
          <Button
            text={t('verify_request_again')}
            onPress={requestAgain}
            options={{
              textSize: 14,
              color: timer === 0 ? 'black100' : 'black50',
              buttonWidth: '100%',
              buttonHeight: 50,
              borderRadius: 10,
            }}
          />
        </View>
      </View>
      <MessageModal isVisible={warningModal} {...warningParams} />
    </WrapperGradient>
  );
};

export default VerifyScreen;
