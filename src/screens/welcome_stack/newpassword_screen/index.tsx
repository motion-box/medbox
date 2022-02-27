import React, {useEffect, useRef, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './style';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Button from '../../../components/global_components/button';
import WrapperGradient from '../../../components/welcome_screens_components/wrapper_gradient';
import HeaderStatic from '../../../components/global_components/header_static';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {useTranslation} from 'react-i18next';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Input from '../../../components/global_components/input';
import {TFunctionResult} from 'i18next';
import MessageModal, {
  MessageModalTypes,
} from '../../../components/global_components/modal/message_modal';
import {userAPI} from '../../../services/UserService';
import {paramsSlice} from '../../../store/reducers/ParamsSlice';
import DialogPopup from '../../../components/global_components/dialog_popup';
import {storeSecureData} from '../../../hooks/localStorage';
import {WelcomeScreensType} from '../../../navigation/WelcomeNavigator';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: {
    params: {
      styled_phone: string;
      phone: string;
      code: string;
    };
  };
}

const NewPasswordScreen = ({navigation, route}: ScreenProps) => {
  const {styled_phone, phone, code} = route.params;
  const {lang} = useAppSelector(state => state.globalReducer);
  const {t} = useTranslation();
  const opacity = useSharedValue(0);

  const handleScroll = (event: any) => {
    if (event.nativeEvent.contentOffset.y > 5) {
      opacity.value = withTiming(1);
    } else {
      opacity.value = withTiming(0);
    }
  };
  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

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

  //states
  const [pass, setPass] = useState('');
  const [passClone, setPassClone] = useState('');
  const [passError, setPassError] = useState(false);
  const [dialogText, setDialogText] = useState<false | TFunctionResult>(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorParams, setErrorParams] =
    useState<MessageModalTypes>(defaultError);
  const checkSuccess = useRef(false);

  //redux side
  const dispatch = useAppDispatch();
  const {setLoading} = paramsSlice.actions;
  const [restore] = userAPI.useRestoreMutation();

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      if (checkSuccess.current) {
        return;
      }
      e.preventDefault();
      goBack(e);
    });
  }, []);

  //chage states
  const setPassFunc = (text: string) => {
    setPassError(false);
    setPass(text.replace(/\s/g, ''));
  };
  const setPassCloneFunc = (text: string) => {
    setPassError(false);
    setPassClone(text.replace(/\s/g, ''));
  };

  const checkFields = () => {
    if (!pass || !passClone) {
      setDialogText(t('fill_warn'));
      setPassError(true);
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

    restoreUser();
  };

  const restoreUser = () => {
    dispatch(setLoading(true));
    restore({
      phone_number: phone,
      code: code,
      new_password: pass,
    })
      .unwrap()
      .then(payload => {
        dispatch(setLoading(false));
        console.log('new pass screen payload: ', payload);
        checkSuccess.current = true;
        navigation.reset({
          index: 1,
          routes: [
            {name: WelcomeScreensType.welcomeScreen},
            {name: WelcomeScreensType.signinScreen},
          ],
        });
      })
      .catch(error => {
        console.log('new pass screen error: ', error);
        dispatch(setLoading(false));
        setTimeout(() => {
          setErrorModal(true);
        }, 500);
      });
  };

  // prevent go back
  const goBack = (e: any) => {
    // default error modal params
    const defaultWarning = {
      title: t('global_warning_title'),
      description: t('warning_already_sent_message_go_back'),
      closeBtn: {
        onPress: () => setErrorModal(false),
      },
      btn: {
        text: t('go_back_anyway'),
        onPress: () => {
          setErrorModal(false);
          navigation.dispatch(e.data.action);
        },
      },
    };
    setErrorParams(defaultWarning);
    setErrorModal(true);
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
        <View style={{height: 20}} />
        <Animated.View
          style={[
            rStyle,
            {
              width: '100%',
              height: 30,
              backgroundColor: 'transparent',
              top: 20,
              zIndex: 1,
              position: 'absolute',
            },
          ]}>
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0)']}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent',
            }}
          />
        </Animated.View>
        <ScrollView
          onScroll={handleScroll}
          scrollEventThrottle={50}
          contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 90}}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{t('newpassword_title')}</Text>
          <Text style={styles.subtitle}>{t('newpassword_description')}</Text>
          <View style={{height: 20}} />
          <Input
            text={styled_phone}
            setText={() => null}
            placeholder={t('phone_number')}
            options={{immutable: true}}
          />
          <View style={{height: 10}} />
          <Input
            text={pass}
            setText={setPassFunc}
            placeholder={t('newpassword_title')}
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
        </ScrollView>
        <View style={styles.bottom_cont}>
          <Button
            text={t('complete')}
            onPress={checkFields}
            options={{
              borderRadius: 10,
              textSize: 14,
              buttonWidth: '100%',
              buttonHeight: 50,
            }}
          />
        </View>
      </View>
      <MessageModal isVisible={errorModal} {...errorParams} />
      {dialogText && <DialogPopup text={dialogText} setText={setDialogText} />}
    </WrapperGradient>
  );
};

export default NewPasswordScreen;
