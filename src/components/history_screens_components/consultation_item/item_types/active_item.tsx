import moment from 'moment';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text} from 'react-native';
import {colorPalet} from '../../../../resources/style/globalStyle';
import Button from '../../../global_components/button';
import CardTitler from '../../../global_components/card_titler';
import HospitalInfo from '../../hospital_info';
import OnlineOffline from '../../online_offline';

interface Iprops {
  type: 'online' | 'offline';
  doctor: {
    id: number;
    name: string;
    speciality: string;
    imageUrl: string;
  };
  workPlace: {
    imageUrl: string;
    name: string;
    price: number;
  };
  paid: boolean;
  date: string;
  startDate: string;
}

const ActiveItem: React.FC<Iprops> = props => {
  const {t} = useTranslation();
  const {type, doctor, workPlace, paid, date, startDate} = props;
  const diff = moment(startDate, 'YYYY-MM-DDTHH:mm').fromNow();
  const diffTime = moment().diff(moment(startDate, 'YYYY-MM-DDTHH:mm'), 'h');
  const actionButtonColor = diffTime < 0 ? 'black20' : 'black100';
  const actionButtonText = diffTime < 0 ? diff : t('start_online');
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
                onPress: () => console.log('doctor info'),
              },
              {
                icon: 'CloseCircleIcon',
                text: t('cancel'),
                disabled: false,
                onPress: () => console.log('cancel'),
              },
              {
                icon: 'StarFillIcon',
                text: t('estimate'),
                disabled: true,
                onPress: () => console.log('estimate'),
              },
              {
                icon: 'AlarmWarningIcon',
                text: t('complain'),
                disabled: true,
                onPress: () => console.log('complain'),
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
        <View style={{position: 'absolute', top: -10, right: 20, zIndex: 1}}>
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
                onPress={() => console.log('book')}
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
            text={actionButtonText}
            icon="VideoIcon"
            onPress={() => console.log('book')}
            options={{
              color: actionButtonColor,
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
