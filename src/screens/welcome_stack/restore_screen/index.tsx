import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import WrapperGradient from '../../../components/welcome_screens_components/wrapper_gradient';
import HeaderStatic from '../../../components/global_components/header_static';
import {useTranslation} from 'react-i18next';
import Input from '../../../components/global_components/input';
import Button from '../../../components/global_components/button';
import OneidBox from '../../../components/welcome_screens_components/oneid_box';
import {useAppDispatch} from '../../../hooks/redux';
import {paramsSlice} from '../../../store/reducers/ParamsSlice';
import {userAPI} from '../../../services/UserService';
import {TFunctionResult} from 'i18next';
import MessageModal, {
  MessageModalTypes,
} from '../../../components/global_components/modal/message_modal';
import {WelcomeScreensType} from '../../../navigation/WelcomeNavigator';
import DialogPopup from '../../../components/global_components/dialog_popup';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
}

const RestoreScreen = ({navigation}: ScreenProps) => {
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
  const alreadySentError = {
    title: t('error_already_sent_message_title'),
    description: t('error_already_sent_message_description'),
    btn: {
      text: t('ok'),
      onPress: () => setErrorModal(false),
    },
  };

  // states
  const [phone, setPhone] = useState('');
  const [dialogText, setDialogText] = useState<false | TFunctionResult>(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorParams, setErrorParams] =
    useState<MessageModalTypes>(defaultError);

  // redux side
  const dispatch = useAppDispatch();
  const {setLoading} = paramsSlice.actions;
  const [sendSms] = userAPI.useSendSmsOnRestoreMutation();

  const restorePress = async () => {
    if (!phone) {
      setDialogText(t('fill_warn'));
      return;
    }
    if (phone.length < 9) {
      setDialogText(t('invalid_phone_number'));
      return;
    }
    dispatch(setLoading(true));
    sendSms({phone_number: `+998${phone}`})
      .unwrap()
      .then(payload => {
        console.log('restore screen payload: ', payload);
        if (payload.ok) {
          dispatch(setLoading(false));
          navigation.navigate(WelcomeScreensType.verifyScreen, {
            styled_phone: `+998 ${phone}`,
            phone: `+998${phone}`,
            smsType: 'restore',
          });
        }
      })
      .catch(error => {
        console.log('restore screen error: ', error);
        dispatch(setLoading(false));
        if (error.data.detail === 'User with this phone number not found.') {
          setErrorParams(nouserError);
        } else if (error.data.detail === 'SMS code already sent') {
          setErrorParams(alreadySentError);
        } else {
          setErrorParams(defaultError);
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
          <Text style={styles.title}>{t('restore_title')}</Text>
          <Text style={styles.subtitle}>{t('restore_description')}</Text>
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
          <Button
            text={t('restore')}
            onPress={restorePress}
            options={{
              buttonWidth: '100%',
              buttonHeight: 50,
              textSize: 14,
              borderRadius: 10,
            }}
          />
          <OneidBox />
        </View>
      </View>
      <MessageModal isVisible={errorModal} {...errorParams} />
      {dialogText && <DialogPopup text={dialogText} setText={setDialogText} />}
    </WrapperGradient>
  );
};

export default RestoreScreen;
