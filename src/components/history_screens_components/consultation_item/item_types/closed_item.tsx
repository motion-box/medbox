import React from 'react';
import {View, Text} from 'react-native';
import CardTitler from '../../../global_components/card_titler';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import {colorPalet, fonts} from '../../../../resources/style/globalStyle';
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
  date: string;
  conclusion: string;
}

const ClosedItem: React.FC<Iprops> = props => {
  const {t} = useTranslation();
  const {type, doctor, workPlace, date, conclusion} = props;
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
                icon: 'StarFillIcon',
                text: t('estimate'),
                disabled: false,
                onPress: () => console.log('estimate'),
              },
              {
                icon: 'AlarmWarningIcon',
                text: t('complain'),
                disabled: false,
                onPress: () => console.log('complain'),
              },
            ],
          },
        }}
      />
      <View
        style={{
          padding: 10,
          borderRadius: 5,
          backgroundColor: colorPalet.bgColor,
          marginTop: 10,
        }}>
        <View style={{position: 'absolute', top: -10, right: 20}}>
          <OnlineOffline type={type} />
        </View>
        <HospitalInfo {...workPlace} color="bgColor" />
      </View>
      <Text
        style={{
          fontSize: 14,
          fontFamily: fonts.sf_semibold,
          color: colorPalet.black100,
          marginVertical: 10,
        }}>
        {t('conclusion')}
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontFamily: fonts.sf_regular,
          color: colorPalet.black50,
        }}>
        {conclusion}
      </Text>
    </View>
  );
};

export default ClosedItem;
