import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import moment from 'moment';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text} from 'react-native';
import {useAndroidLocationPermission} from '../../../../hooks/useAndroidLocationPermission';
import {NavigatorTypes} from '../../../../navigation';
import {
  colorPalet,
  colorPaletTypes,
} from '../../../../resources/style/globalStyle';
import Button from '../../../global_components/button';
import CardTitler from '../../../global_components/card_titler';
import HospitalInfo from '../../hospital_info';
import OnlineOffline from '../../online_offline';
import Geolocation from 'react-native-geolocation-service';

interface Iprops {
  type: 'online' | 'offline';
  doctor: {
    id: number;
    name: string;
    speciality: string;
    imageUrl: string;
  };
  workPlace: {
    imageUrl: string | undefined;
    name: string;
    price: number;
    latitude: string;
    longitude: string;
  };
  paid: boolean;
  date: string;
  startDate: string;
  onDoctorInfoPress: () => void;
  onOtherPress: (isEstimate: boolean) => void;
  paymentData: {
    registerId: number;
    specialityId: number;
    conclusionId: number;
    price: number;
  };
}

const ActiveItem: React.FC<Iprops> = props => {
  const {t} = useTranslation();
  const {
    type,
    doctor,
    workPlace,
    paid,
    date,
    startDate,
    onDoctorInfoPress,
    onOtherPress,
    paymentData,
  } = props;
  const diff = moment(startDate, 'YYYY-MM-DDTHH:mm').fromNow();
  const diffTime = moment().diff(moment(startDate, 'YYYY-MM-DDTHH:mm'), 'h');
  const navigation = useNavigation<StackNavigationProp<any>>();

  const validateButtonPress = () => {
    if (!paid) return;
    if (type == 'offline') {
      diffTime < 1 && showOnMapPress();
    } else {
      diffTime < 1 &&
        diffTime >= 0 &&
        navigation.navigate(
          NavigatorTypes.consultationStack.inmplantScreen,
          doctor,
        );
    }
  };

  const textColorFunction = (funcType: string) => {
    let returnedVal;
    if (funcType === 'text') {
      if (type === 'online') {
        returnedVal =
          diffTime > 1
            ? t('time_expired')
            : diffTime < 0
            ? diff
            : t('start_online');
      } else {
        returnedVal = diffTime >= 1 ? t('time_expired') : t('show_on_map');
      }
    } else {
      if (type === 'online') {
        returnedVal =
          diffTime > 1 ? 'black20' : diffTime < 0 ? 'black20' : 'black100';
      } else {
        returnedVal = diffTime >= 1 ? 'black20' : 'black100';
      }
    }
    return returnedVal;
  };

  const onPayPress = () => {
    navigation.navigate(NavigatorTypes.stacks.paymentScreen, {
      consultationData: {...paymentData},
    });
  };

  const showOnMapPress = async () => {
    const permission = await useAndroidLocationPermission();
    if (permission === 'granted') {
      Geolocation.getCurrentPosition(
        position => {
          navigation.navigate(NavigatorTypes.stacks.mapScreen, {
            taskType: 'show_on_map',
            userPos: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            placePos: {
              latitude: parseFloat(workPlace.latitude),
              longitude: parseFloat(workPlace.longitude),
            },
          });
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  return (
    <View>
      <CardTitler
        imageUrl={doctor.imageUrl}
        name={doctor.name}
        subtitle={doctor.speciality}
        right={{
          centered: {
            text: moment(date, 'YYYY-MM-DDTHH:mm').format('DD.MM.YY HH:mm'),
            options: [
              {
                icon: 'NurseIcon',
                text: t('doctor_info'),
                disabled: false,
                onPress: onDoctorInfoPress,
              },
              {
                icon: 'StarFillIcon',
                text: t('estimate'),
                disabled: true,
                onPress: () => onOtherPress(true),
              },
              {
                icon: 'AlarmWarningIcon',
                text: t('complain'),
                disabled: true,
                onPress: () => onOtherPress(false),
              },
            ],
          },
        }}
      />
      <View
        style={{
          borderRadius: 5,
          backgroundColor: colorPalet.bgColor,
          padding: 10,
          marginVertical: 10,
        }}>
        <View style={{position: 'absolute', top: -10, right: 10, zIndex: 1}}>
          <OnlineOffline type={type} />
        </View>
        <HospitalInfo {...workPlace} color="bgColor" />
      </View>
      <View style={{flexDirection: 'row'}}>
        {!paid && (
          <>
            <View style={{flex: 1}}>
              <Button
                text={t('pay')}
                icon="WalletIcon"
                onPress={onPayPress}
                options={{
                  buttonWidth: '100%',
                  buttonHeight: 40,
                  textSize: 14,
                }}
              />
            </View>
            <View style={{width: 10}} />
          </>
        )}
        <View style={{flex: 1}}>
          <Button
            text={textColorFunction('text')}
            icon={type === 'online' ? 'VideoIcon' : 'RoadMapIcon'}
            onPress={validateButtonPress}
            options={{
              color: paid
                ? (textColorFunction('color') as colorPaletTypes)
                : 'black20',
              buttonWidth: '100%',
              buttonHeight: 40,
              textSize: 14,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ActiveItem;
