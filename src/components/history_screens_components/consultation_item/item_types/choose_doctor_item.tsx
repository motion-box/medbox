import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colorPalet, fonts} from '../../../../resources/style/globalStyle';
import CardTitler from '../../../global_components/card_titler';
import PopupMenu from '../../../global_components/popup_menu';
import OnlineOffline from '../../online_offline';

interface Iprops {
  type: 'online' | 'offline';
  speciality: string;
  description: string;
  doctors: {
    id: number;
    imageUrl: string;
    name: string;
    speciality: string;
    rate: number;
    price: number;
  }[];
}

const ChooseDoctorItem: React.FC<Iprops> = props => {
  const {t} = useTranslation();
  const {type, speciality, description, doctors} = props;

  return (
    <View>
      <View style={styles.title_cont}>
        <Text style={styles.title}>{speciality}</Text>
        <View style={styles.right_cont}>
          <OnlineOffline type={type} />
          <View style={{width: 10}} />
          <PopupMenu
            options={[
              {
                icon: 'AlarmWarningIcon',
                text: t('cancel'),
                disabled: false,
                onPress: () => console.log('cancel'),
              },
            ]}
          />
        </View>
      </View>
      <Text style={styles.description}>{description}</Text>
      <Text style={[styles.title, {marginVertical: 10}]}>{t('doctors')}</Text>
      <View style={styles.doctors_cont}>
        <TouchableOpacity
          style={[styles.doctor_item]}
          activeOpacity={0.8}
          onPress={() => console.log('Doctor ID: ' + doctors[0].id)}>
          <CardTitler
            imageUrl={doctors[0].imageUrl}
            name={doctors[0].name}
            stars={doctors[0].rate as 1}
            clipper="bg"
            right={{
              boldSecond: {
                title: doctors[0].speciality,
                subtitle: `≈${doctors[0].price} uzs`,
              },
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.doctor_item, {borderBottomWidth: 0}]}
          activeOpacity={0.8}
          onPress={() => console.log('Doctor ID: ' + doctors[1].id)}>
          <CardTitler
            imageUrl={doctors[1].imageUrl}
            name={doctors[1].name}
            stars={doctors[1].rate as 1}
            clipper="bg"
            right={{
              boldSecond: {
                title: doctors[1].speciality,
                subtitle: `≈${doctors[1].price} uzs`,
              },
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title_cont: {
    height: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.sf_semibold,
    color: colorPalet.black100,
  },
  right_cont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    fontSize: 14,
    fontFamily: fonts.sf_regular,
    color: colorPalet.black50,
  },
  doctors_cont: {
    borderRadius: 5,
    backgroundColor: colorPalet.bgColor,
  },
  doctor_item: {
    padding: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: colorPalet.black10,
  },
});

export default ChooseDoctorItem;
