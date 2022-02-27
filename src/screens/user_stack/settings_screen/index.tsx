import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './style';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {useAppSelector} from '../../../hooks/redux';
import {colorPalet} from '../../../resources/style/globalStyle';
import StatusBarFocus from '../../../components/global_components/StatusBarCustom';
import Header from '../../../components/global_components/header';
import {clearAllSecureData} from '../../../hooks/localStorage';
import {CommonActions} from '@react-navigation/native';
import {RootNavigatorTypes} from '../../../navigation';
import {ImageAddIcon} from '../../../resources/icons/icons';
import {useTranslation} from 'react-i18next';
import Input from '../../../components/global_components/input';
import DatePicker from '../../../components/global_components/date_picker';
import moment from 'moment';
import RadioSelector from '../../../components/global_components/radio_selector';
import LocationInput from '../../../components/global_components/location_input';
import Button from '../../../components/global_components/button';
import MessageModal, {
  MessageModalTypes,
} from '../../../components/global_components/modal/message_modal';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: {
    params?: {};
  };
}

const SettingsScreen = ({navigation}: ScreenProps) => {
  const {t} = useTranslation();
  const {screen, os} = useAppSelector(state => state.globalReducer);
  const scrollY = useSharedValue(0);
  const [name, setName] = useState('Alisa');
  const [lastname, setLastname] = useState('Miller');
  const [date, setDate] = useState('12.02.2000');
  const [email, setEmail] = useState('alisamiler@gmail.com');
  const [phone, setPhone] = useState('+998 99 123 32 41');
  const [address, setAddress] = useState({
    text: 'Yakkasaray district, st. Ivleeva, 10',
    lat: '12.29023',
    lng: '39.3002',
  });
  const allowGoBack = useRef(false);
  const logoutWarn: MessageModalTypes = {
    title: t('lgout_warning_tite'),
    description: t('lgout_warning_description'),
    closeBtn: {
      onPress: () => {
        allowGoBack.current = false;
        setMessage(false);
      },
    },
    btn: {
      text: t('logout_anyway'),
      onPress: () => {
        clearAllSecureData().then(res => {
          if (res === 'success') {
            setMessage(false);
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: RootNavigatorTypes.welcomeStack}],
              }),
            );
          }
        });
      },
    },
  };

  const [isMessage, setMessage] = useState(false);
  const [messageParams, setMessageParams] =
    useState<MessageModalTypes>(logoutWarn);

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      if (!allowGoBack.current) {
        e.preventDefault();
        onGoBack(e);
        return;
      }
    });
  }, [navigation]);

  const onGoBack = (e: any) => {
    console.log('calling');
    const unsavedWarn: MessageModalTypes = {
      title: t('global_warning_title'),
      description: t('unsaved_changes'),
      closeBtn: {
        onPress: () => setMessage(false),
      },
      btn: {
        text: t('go_back_anyway'),
        onPress: () => {
          setMessage(false);
          navigation.dispatch(e.data.action);
        },
      },
    };
    setMessageParams(unsavedWarn);
    setMessage(true);
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollY.value = e.contentOffset.y;
    },
  });

  const logOut = () => {
    allowGoBack.current = true;
    setMessageParams(logoutWarn);
    setMessage(true);
    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [{name: RootNavigatorTypes.welcomeStack}],
    //   }),
    // );
  };

  return (
    <View
      style={{
        backgroundColor: colorPalet.bgColor,
        flex: 1,
      }}>
      <View
        style={{
          backgroundColor: colorPalet.bgColor,
          flex: 1,
          marginTop: screen.hasNotch ? 44 : screen.headerSize || 20,
        }}>
        <StatusBarFocus
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <Header
          scrollY={scrollY}
          options={{
            title: t('settings'),
            bigAlign: 'center',
            smallAlign: 'center',
            left: {
              backgroundColor: 'white100',
              icon: 'ArrowIcon',
              iconRotate: '90',
              onPress: () => navigation.goBack(),
            },
            right: {
              backgroundColor: 'white100',
              icon: 'LogoutBoxIcon',
              isGradient: true,
              onPress: () => logOut(),
            },
          }}
        />
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={os === 'ios' ? 'padding' : undefined}>
          <Animated.ScrollView
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            contentContainerStyle={{
              paddingTop: 40,
              paddingHorizontal: 20,
              paddingBottom: screen.hasNotch ? 114 : 90,
            }}
            style={{zIndex: -1, flex: 1, top: 40}}
            showsVerticalScrollIndicator={false}>
            <View style={styles.image_cont}>
              <TouchableOpacity style={styles.image_box} activeOpacity={0.8}>
                <Image
                  source={require('../../../resources/images/img.png')}
                  style={styles.image}
                />
                <View style={styles.add_image_cont}>
                  <ImageAddIcon
                    width="16"
                    height="16"
                    color={colorPalet.white100}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.titler}>{t('information')}</Text>
            <View style={styles.name_cont}>
              <View style={{flex: 1}}>
                <Input text={name} setText={setName} placeholder={t('name')} />
              </View>
              <View style={{width: 10}} />
              <View style={{flex: 1}}>
                <Input
                  text={lastname}
                  setText={setLastname}
                  placeholder={t('lastname')}
                />
              </View>
            </View>
            <View style={{height: 10}} />
            <DatePicker
              date={date}
              setDate={setDate}
              placeholder={t('datebirth')}
              mode="date"
              maxDate={moment().format('DD.MM.YYYY')}
            />
            <View style={{height: 10}} />
            <RadioSelector
              data={[t('male'), t('female')]}
              onSelect={number => console.log(number)}
            />
            <Text style={styles.titler}>{t('contacts')}</Text>
            <Input
              text={email}
              setText={setEmail}
              placeholder={t('lastname')}
              options={{
                type: 'email-address',
              }}
            />
            <View style={{height: 10}} />
            <Input
              text={phone}
              setText={setPhone}
              placeholder={t('lastname')}
              options={{
                type: 'number-pad',
                immutable: true,
              }}
            />
            <View style={{height: 10}} />
            <LocationInput
              location={address}
              setLocation={setAddress}
              placeholder={t('show_address')}
            />
          </Animated.ScrollView>
        </KeyboardAvoidingView>
        <View
          style={{
            marginHorizontal: 20,
            marginBottom: screen.hasNotch ? 44 : 20,
          }}>
          <Button
            text={t('save')}
            onPress={() => console.log('save')}
            options={{
              buttonWidth: '100%',
              buttonHeight: 50,
              textSize: 14,
              borderRadius: 10,
            }}
          />
        </View>
      </View>
      <MessageModal isVisible={isMessage} {...messageParams} />
    </View>
  );
};

export default SettingsScreen;
