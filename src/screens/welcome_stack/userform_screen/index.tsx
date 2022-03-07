import React, {useState} from 'react';
import {Text, View} from 'react-native';
import styles from './style';
import {useTranslation} from 'react-i18next';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import WrapperGradient from '../../../components/welcome_screens_components/wrapper_gradient';
import HeaderStatic from '../../../components/global_components/header_static';
import Input from '../../../components/global_components/input';
import RadioSelector from '../../../components/global_components/radio_selector';
import DatePicker from '../../../components/global_components/date_picker';
import LocationInput, {
  locationType,
} from '../../../components/global_components/location_input';
import Button from '../../../components/global_components/button';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import DialogPopup from '../../../components/global_components/dialog_popup';
import {TFunctionResult} from 'i18next';
import {userAPI} from '../../../services/UserService';
import moment from 'moment';
import {storeSecureData} from '../../../hooks/localStorage';
import {useAppSelector} from '../../../hooks/redux';
import {NavigatorTypes} from '../../../navigation';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: {
    params: {
      styled_phone: string;
      phone: string;
      password: string;
    };
  };
}
const date = new Date();

const UserFormScreen = ({navigation, route}: ScreenProps) => {
  const {styled_phone, phone, password} = route.params;
  const {lang} = useAppSelector(state => state.globalReducer);
  const {t} = useTranslation();
  const opacity = useSharedValue(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [date, setDate] = useState('');
  const [gender, setGender] = useState(0);
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState<locationType | null>(null);
  const [dialogText, setDialogText] = useState<TFunctionResult | false>(false);

  const [registrate] = userAPI.useRegisterMutation();

  const checkFields = () => {
    if (!firstName || !lastName || !date || !email || !location) {
      setDialogText(t('fill_warn'));
    }
    registrateUser();
  };

  const registrateUser = async () => {
    registrate({
      phone_number: phone,
      password: password,
      first_name: firstName,
      last_name: lastName,
      birth_date: moment(date, 'DD.MM.YYYY').format('YYYY-MM-DD'),
      gender: gender === 0 ? 'male' : 'female',
      email: email,
      longitude: location!.lng,
      latitude: location!.lat,
    })
      .unwrap()
      .then(payload => {
        console.log('user form payload:', payload);
        if (payload.token) {
          storeSecureData(payload, lang);
          navigation.reset({
            index: 0,
            routes: [
              {
                name: NavigatorTypes.stacks.mainStack,
              },
            ],
          });
        }
      })
      .catch(error => {
        console.log('user form error:', error);
      });
  };

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
          <Text style={styles.title}>{t('user_form_title')}</Text>
          <Text style={styles.subtitle}>{t('user_form_description')}</Text>
          <View style={{height: 20}} />
          <View style={styles.name_inputs_cont}>
            <View style={{flex: 1}}>
              <Input
                text={firstName}
                setText={setFirstName}
                placeholder={t('firstname')}
              />
            </View>
            <View style={{width: 10}} />
            <View style={{flex: 1}}>
              <Input
                text={lastName}
                setText={setLastName}
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
          />
          <View style={{height: 20}} />
          <RadioSelector data={[t('male'), t('female')]} onSelect={setGender} />
          <Text style={styles.titler}>{t('contacts')}</Text>
          <Input
            text={email}
            setText={setEmail}
            placeholder={t('email')}
            options={{
              type: 'email-address',
            }}
          />
          <View style={{height: 10}} />
          <Input
            text={styled_phone}
            setText={() => null}
            placeholder={t('phone_number')}
            options={{immutable: true}}
          />
          <View style={{height: 10}} />
          <LocationInput
            location={location}
            setLocation={setLocation}
            placeholder={t('show_address')}
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
      {dialogText && <DialogPopup text={dialogText} setText={setDialogText} />}
    </WrapperGradient>
  );
};

export default UserFormScreen;
