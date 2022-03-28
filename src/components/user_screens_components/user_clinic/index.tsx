import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './style';
import {ClinicModel} from '../../../models/DoctorModel';
import {useTranslation} from 'react-i18next';
import {DoctorModel} from '../../../models/DoctorModel';
import {useAppSelector} from '../../../hooks/redux';
import {useNavigation} from '@react-navigation/native';
import {NavigatorTypes} from '../../../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface Iprops {
  data: {
    clinic?: ClinicModel;
    doctor?: DoctorModel<number>;
  };
}

const UserClinic: React.FC<Iprops> = props => {
  const navigation = useNavigation<NativeStackNavigationProp<any, any>>();
  const {t} = useTranslation();
  const {clinic, doctor} = props.data;
  const {lang} = useAppSelector(state => state.globalReducer);
  const {specialities} = useAppSelector(state => state.classifiersReucer);
  const [speciality, setSpeciality] = useState('');

  useEffect(() => {
    if (doctor) getSpeciality();
  }, []);

  const getSpeciality = () => {
    let result = specialities.find(spts => spts.id == doctor?.speciality);
    result && setSpeciality(result[`name_${lang}`]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.line}>
        <Text style={styles.title}>{t('your_clinic')}</Text>
        <Text style={styles.subtitle}>
          {clinic?.name || t('not_specified')}
        </Text>
      </View>
      <View style={styles.border} />
      <View style={styles.line}>
        <Text style={styles.title}>{t('doctor')}</Text>
        {doctor ? (
          <TouchableOpacity
            style={styles.doctor_cont}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate(NavigatorTypes.doctorStack.doctorScreen, {
                id: doctor.id,
              })
            }>
            <Image
              style={styles.image_cont}
              source={require('../../../resources/images/img4.png')}
            />
            <View>
              <Text
                style={
                  styles.subtitle
                }>{`${doctor.first_name} ${doctor.last_name}`}</Text>
              <Text style={styles.speciality}>{speciality}</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <Text style={styles.subtitle}>{t('not_specified')}</Text>
        )}
      </View>
    </View>
  );
};

export default UserClinic;
