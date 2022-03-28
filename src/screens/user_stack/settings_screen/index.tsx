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
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {colorPalet} from '../../../resources/style/globalStyle';
import StatusBarFocus from '../../../components/global_components/StatusBarCustom';
import Header from '../../../components/global_components/header';
import {clearAllSecureData} from '../../../hooks/localStorage';
import {CommonActions} from '@react-navigation/native';
import {NavigatorTypes} from '../../../navigation';
import {ArrowIcon, ImageAddIcon} from '../../../resources/icons/icons';
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
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {userAPI} from '../../../services/UserService';
import {userSlice} from '../../../store/reducers/UserSlice';
import {paramsSlice} from '../../../store/reducers/ParamsSlice';
import LanguageBottomSheet from '../../../components/user_screens_components/language_bottom_sheet';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: {
    params?: {};
  };
}

const SettingsScreen = ({navigation}: ScreenProps) => {
  const {t, i18n} = useTranslation();
  const {screen, os, lang} = useAppSelector(state => state.globalReducer);
  const {userData, accessData, choosenLocation} = useAppSelector(
    state => state.userReducer,
  );
  const scrollY = useSharedValue(0);

  const [photo, setPhoto] = useState(userData?.photo);
  const [name, setName] = useState(userData?.first_name as string);
  const [lastname, setLastname] = useState(userData?.last_name as string);
  const [date, setDate] = useState(
    moment(userData?.birth_date, 'YYYY-MM-DD').format('DD.MM.YYYY'),
  );
  const [gender, setGender] = useState(userData?.gender);
  const [email, setEmail] = useState(userData?.email as string);
  const [phone, setPhone] = useState(userData?.phone_number as string);
  const [address, setAddress] = useState({
    address: userData?.address as string,
    lat: userData?.latitude as string,
    lng: userData?.longitude as string,
  });
  const allowGoBack = useRef(true);

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
            i18n.changeLanguage('en');
            setMessage(false);
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: NavigatorTypes.stacks.welcomeStack}],
              }),
            );
          }
        });
      },
    },
  };
  const saveWarn: MessageModalTypes = {
    title: t('global_warning_title'),
    description: t('global_data_change_description'),
    closeBtn: {
      onPress: () => {
        allowGoBack.current = false;
        setMessage(false);
      },
    },
    btn: {
      text: t('accept'),
      onPress: () => {
        setMessage(false);
        changeData();
      },
    },
  };
  const errorWarn: MessageModalTypes = {
    title: t('global_error_title'),
    description: t('global_error_description'),
    btn: {
      text: t('ok'),
      onPress: () => {
        setMessage(false);
      },
    },
  };

  const [isMessage, setMessage] = useState(false);
  const [messageParams, setMessageParams] =
    useState<MessageModalTypes>(logoutWarn);
  const [isModal, setModal] = useState(false);

  const [changeUserData] = userAPI.useChangeUserDataMutation();
  const [getUserData] = userAPI.useGetUserDataMutation();
  const dispatch = useAppDispatch();
  const {setUserData, setChoosenLocation} = userSlice.actions;
  const {setLoading} = paramsSlice.actions;

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      if (!allowGoBack.current) {
        e.preventDefault();
        onGoBack(e);
        return;
      }
    });
  }, [navigation]);

  useEffect(() => {
    console.log('Settings_Screen:', choosenLocation);
    if (choosenLocation) {
      allowGoBack.current = false;
      setAddress({
        lat: choosenLocation.latitude,
        lng: choosenLocation.longitude,
        address: choosenLocation.address,
      });
    }
  }, [choosenLocation]);

  const onGoBack = (e: any) => {
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
          dispatch(setChoosenLocation(null));
          navigation.dispatch(e.data.action);
        },
      },
    };
    setMessageParams(unsavedWarn);
    setMessage(true);
  };

  // do not alows to go back after change data
  const onChangeState = (
    setter: React.Dispatch<React.SetStateAction<any>>,
    data: any,
  ) => {
    console.log(data);
    allowGoBack.current = false;
    setter(data);
  };

  // on photo change
  const onChangePhoto = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.7,
    };
    const image = await launchImageLibrary(options);
    if (image.assets) {
      dispatch(setLoading(true));
      setPhoto(image.assets[0].uri);
      const formData = new FormData();
      formData.append('photo', {
        uri: image.assets[0].uri,
        type: image.assets[0].type,
        name: image.assets[0].fileName,
      });
      changeUserData({
        id: accessData!.id,
        token: accessData!.token,
        methood: 'PATCH',
        conentType: 'formData',
        body: formData,
      })
        .unwrap()
        .then(res => {
          dispatch(setLoading(false));
          if (res.id) {
            getChangedUserData(res.id);
          } else {
            setMessage(true);
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  // on save button pressed
  const onSavePress = () => {
    if (!allowGoBack.current) {
      setMessageParams(saveWarn);
      setMessage(true);
    } else {
      navigation.goBack();
    }
  };

  // change data after get agreement
  const changeData = () => {
    dispatch(setLoading(true));
    const body = {
      first_name: name,
      last_name: lastname,
      birth_date: moment(date, 'DD.MM.YYYY').format('YYYY-MM-DD'),
      gender: gender,
      email: email,
      latitude: address.lat,
      longitude: address.lng,
    };
    changeUserData({
      id: accessData!.id,
      token: accessData!.token,
      methood: 'PATCH',
      conentType: 'json',
      body: body,
    })
      .unwrap()
      .then(res => {
        if (res.id) {
          getChangedUserData(res.id);
        } else {
          setTimeout(() => {
            dispatch(setLoading(false));
            setTimeout(() => {
              setMessageParams(errorWarn);
              setMessage(true);
            }, 400);
          }, 400);
        }
      })
      .catch(e => {
        setTimeout(() => {
          dispatch(setLoading(false));
          setTimeout(() => {
            setMessageParams(errorWarn);
            setMessage(true);
          }, 400);
        }, 400);
      });
  };

  const getChangedUserData = (id: number) => {
    getUserData({id: id, token: accessData!.token})
      .unwrap()
      .then(user => {
        allowGoBack.current = true;
        setTimeout(() => {
          dispatch(setLoading(false));
          setTimeout(() => {
            dispatch(setChoosenLocation(null));
            dispatch(setUserData(user));
            navigation.goBack();
          }, 400);
        }, 400);
      });
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
              paddingTop: 50,
              paddingHorizontal: 20,
              paddingBottom: 60,
            }}
            style={{zIndex: -1, flex: 1, top: 40}}
            showsVerticalScrollIndicator={false}>
            <View style={styles.image_cont}>
              <TouchableOpacity
                style={styles.image_box}
                activeOpacity={0.8}
                onPress={onChangePhoto}>
                <Image
                  defaultSource={require('../../../resources/images/user_logo.png')}
                  source={{
                    uri: photo,
                  }}
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
            <View style={{height: 10}} />
            <TouchableOpacity
              style={styles.language_btn}
              activeOpacity={0.8}
              onPress={() => setModal(true)}>
              <Text style={styles.language_text}>
                {lang === 'en'
                  ? 'English'
                  : lang === 'ru'
                  ? 'Русский'
                  : "O'zbekcha"}
              </Text>
              <ArrowIcon
                rotate="270"
                width="16"
                height="16"
                color={colorPalet.black50}
              />
            </TouchableOpacity>
            <Text style={styles.titler}>{t('information')}</Text>
            <View style={styles.name_cont}>
              <View style={{flex: 1}}>
                <Input
                  text={name}
                  setText={data => onChangeState(setName, data)}
                  placeholder={t('name')}
                />
              </View>
              <View style={{width: 10}} />
              <View style={{flex: 1}}>
                <Input
                  text={lastname}
                  setText={data => onChangeState(setLastname, data)}
                  placeholder={t('lastname')}
                />
              </View>
            </View>
            <View style={{height: 10}} />
            <DatePicker
              date={date}
              setDate={data => onChangeState(setDate, data)}
              placeholder={t('datebirth')}
              mode="date"
              maxDate={moment().format('DD.MM.YYYY')}
            />
            <View style={{height: 10}} />
            <RadioSelector
              activeId={userData?.gender === 'male' ? 0 : 1}
              data={[t('male'), t('female')]}
              onSelect={number => setGender(number === 0 ? 'male' : 'female')}
            />
            <Text style={styles.titler}>{t('contacts')}</Text>
            <Input
              text={email}
              setText={data => onChangeState(setEmail, data)}
              placeholder={t('lastname')}
              options={{
                type: 'email-address',
              }}
            />
            <View style={{height: 10}} />
            <Input
              text={phone}
              setText={() => null}
              placeholder={t('phone_number')}
              options={{
                type: 'number-pad',
                immutable: true,
              }}
            />
            <View style={{height: 10}} />
            <LocationInput location={address} placeholder={t('show_address')} />
          </Animated.ScrollView>
        </KeyboardAvoidingView>
        <View
          style={{
            marginHorizontal: 20,
            marginBottom: screen.hasNotch ? 44 : 20,
          }}>
          <Button
            text={t('save')}
            onPress={onSavePress}
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
      {isModal && (
        <LanguageBottomSheet isVisible={isModal} setVisible={setModal} />
      )}
    </View>
  );
};

export default SettingsScreen;
