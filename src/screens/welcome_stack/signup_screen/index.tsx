import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import HeaderStatic from '../../../components/global_components/header_static';
import WrapperGradient from '../../../components/welcome_screens_components/wrapper_gradient';
import styles from './style';
import Input from '../../../components/global_components/input';
import Button from '../../../components/global_components/button';
import {WelcomeScreensType} from '../../../navigation/WelcomeNavigator';
import OneidBox from '../../../components/welcome_screens_components/oneid_box';
import {userAPI} from '../../../services/UserService';
import {useAppDispatch} from '../../../hooks/redux';
import {paramsSlice} from '../../../store/reducers/ParamsSlice';
import MessageModal, {
  MessageModalTypes,
} from '../../../components/global_components/modal/message_modal';
import DialogPopup from '../../../components/global_components/dialog_popup';
import {TFunctionResult} from 'i18next';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
}

const SignupScreen = ({navigation}: ScreenProps) => {
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
  const alreadySentError = {
    title: t('error_already_sent_message_title'),
    description: t('error_already_sent_message_description'),
    btn: {
      text: t('ok'),
      onPress: () => setErrorModal(false),
    },
  };
  const alreadyRegistredError = {
    title: t('error_already_registred_title'),
    description: t('error_already_registred_description'),
    closeBtn: {
      onPress: () => setErrorModal(false),
    },
    btn: {
      text: t('sign_in'),
      onPress: () => navigation.navigate(WelcomeScreensType.signinScreen),
    },
  };

  // states
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const [passClone, setPassClone] = useState('');
  const [passError, setPassError] = useState(false);
  const [dialogText, setDialogText] = useState<false | TFunctionResult>(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorParams, setErrorParams] =
    useState<MessageModalTypes>(defaultError);

  //redux part
  const dispatch = useAppDispatch();
  const {setLoading} = paramsSlice.actions;
  const [sendSms] = userAPI.useSendSmsOnRegisterMutation();

  //chage states
  const setPassFunc = (text: string) => {
    setPassError(false);
    setPass(text.replace(/\s/g, ''));
  };
  const setPassCloneFunc = (text: string) => {
    setPassError(false);
    setPassClone(text.replace(/\s/g, ''));
  };

  // checking states
  const comfirmAndCheck = () => {
    if (!phone || !pass || !passClone) {
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
    if (pass.length > 31) {
      setDialogText(t('maximum_pass_characters'));
      setPassError(true);
      return;
    }
    if (pass !== passClone) {
      setDialogText(t('pass_error'));
      setPassError(true);
      return;
    }

    sendSmsToRegister();
  };

  // send to server
  const sendSmsToRegister = async () => {
    dispatch(setLoading(true));
    sendSms({
      phone_number: `+998${phone}`,
      password: pass,
    })
      .unwrap()
      .then(payload => {
        if (payload.ok) {
          dispatch(setLoading(false));
          navigation.navigate(WelcomeScreensType.verifyScreen, {
            styled_phone: `+998 ${phone}`,
            phone: `+998${phone}`,
            password: pass,
            smsType: 'register',
          });
        }
      })
      .catch(error => {
        console.log('Error sign up screen:', error);
        if (error.data.detail === 'SMS code already sent') {
          setErrorParams(alreadySentError);
        } else if (error.data.detail === 'This phone number already used.') {
          setErrorParams(alreadyRegistredError);
        } else {
          setErrorParams(defaultError);
        }
        dispatch(setLoading(false));
        setTimeout(() => {
          setErrorModal(true);
        }, 500);
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
          <Text style={styles.title}>{t('sign_up_title')}</Text>
          <Text style={styles.subtitle}>{t('sign_up_description')}</Text>
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
          <View style={{height: 10}} />
          <Input
            text={passClone}
            setText={setPassCloneFunc}
            placeholder={t('password_repeat')}
            options={{
              type: 'default',
              secure: true,
              icon: 'EyeOffIcon',
              error: passError,
            }}
          />
          <View style={{height: 20}} />
          <Button
            text={t('sign_up')}
            onPress={comfirmAndCheck}
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
          <Text style={styles.link_description}>{t('a_member')}</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(WelcomeScreensType.signinScreen)
            }>
            <Text style={styles.link_style}>{t('sign_in')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <MessageModal isVisible={errorModal} {...errorParams} />
      {dialogText && <DialogPopup text={dialogText} setText={setDialogText} />}
    </WrapperGradient>
  );
};

export default SignupScreen;
