import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CardTitler from '../../../global_components/card_titler';
import moment from 'moment';
import OnlineOffline from '../../online_offline';
import Button from '../../../global_components/button';
import {useTranslation} from 'react-i18next';

interface Iprops {
  type: 'online' | 'offline';
  doctor: {
    id: number;
    name: string;
    speciality: string;
    imageUrl: string;
  };
}

const BookNotActiveItem: React.FC<Iprops> = ({type, doctor}) => {
  const {t} = useTranslation();
  return (
    <View>
      <CardTitler
        imageUrl={doctor.imageUrl}
        name={doctor.name}
        subtitle={doctor.speciality}
        right={{
          centered: {
            text: '                    ',
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
                onPress: () => console.log('doctor info'),
              },
            ],
          },
        }}
      />
      <View style={{position: 'absolute', top: 8, right: 26, zIndex: 0}}>
        <OnlineOffline type="offline" />
      </View>
      <View style={{height: 10}} />
      <Button
        text={t('doctor_book')}
        onPress={() => console.log('book')}
        options={{
          buttonWidth: '100%',
          buttonHeight: 40,
          textSize: 14,
        }}
      />
    </View>
  );
};
export default BookNotActiveItem;
