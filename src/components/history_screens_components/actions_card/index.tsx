import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, SectionList} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import {colorPalet} from '../../../resources/style/globalStyle';
import moment from 'moment';
import CardTitler from '../../global_components/card_titler';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NavigatorTypes} from '../../../navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {RegisterModel} from '../../../models/HistoryItemsModel';
import {SpecialityModel} from '../../../models/ClassifiersModel';
import {LangTypes} from '../../../models/GlobalModel';
import {useAppDispatch} from '../../../hooks/redux';
import {paramsSlice} from '../../../store/reducers/ParamsSlice';

interface Iprops {
  data: RegisterModel;
  specialities: SpecialityModel[];
  lang: LangTypes;
}

const ActionCard: React.FC<Iprops> = ({data, specialities, lang}) => {
  const {t} = useTranslation();
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const {
    id,
    is_active,
    opened_doctor,
    closed_doctor,
    created_time,
    finished_time,
    is_payment_required,
  } = data;
  const dispatch = useAppDispatch();
  const {setRegisterId} = paramsSlice.actions;
  const activeGrad = colorPalet.brandGradient;
  const closedGrad = [colorPalet.black10, colorPalet.black10];
  const [openDoctorSpeciality, setOpenDoctorSpeciality] = useState('');
  const [closeDoctorSpeciality, setCloseDoctorSpeciality] = useState('');
  const statusGrad = is_active ? activeGrad : closedGrad;

  useEffect(() => {
    getSpeciality(opened_doctor.id, setOpenDoctorSpeciality);
    closed_doctor && getSpeciality(closed_doctor.id, setCloseDoctorSpeciality);
  }, []);

  const getSpeciality = (
    id: number,
    setter: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    let result = specialities.find(spts => spts.id == id);
    result && setter(result[`name_${lang}`]);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        dispatch(setRegisterId(id));
        navigation.navigate(NavigatorTypes.stacks.historyStack);
      }}>
      <View style={styles.line}>
        <Text style={styles.title}>{`№ ${id
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}`}</Text>
        <LinearGradient
          colors={statusGrad}
          style={styles.status_cont}
          start={{x: 0.5, y: 0.5}}
          end={{x: 1, y: 1}}
          useAngle={true}
          angleCenter={{x: 0.5, y: 0.5}}
          angle={160}>
          <Text
            style={[
              styles.status_text,
              {
                color: is_active ? colorPalet.white100 : colorPalet.black50,
              },
            ]}
            adjustsFontSizeToFit={true}
            numberOfLines={1}>
            {t(is_active ? 'active' : 'closed')}
          </Text>
        </LinearGradient>
      </View>
      <CardTitler
        imageUrl={opened_doctor.photo}
        name={`${opened_doctor.first_name} ${opened_doctor.last_name}`}
        subtitle={openDoctorSpeciality}
        right={{
          boldFirst: {
            title: `${t('created')}:`,
            subtitle: moment(created_time, 'YYYY-MM-DDTHH:mm').format(
              'DD.MM.YY HH:mm',
            ),
          },
        }}
      />
      {closed_doctor ? (
        <>
          <View style={styles.border} />
          <CardTitler
            imageUrl={closed_doctor.photo}
            name={`${closed_doctor.first_name} ${closed_doctor.last_name}`}
            subtitle={closeDoctorSpeciality}
            right={{
              boldFirst: {
                title: `${t('finished')}:`,
                subtitle: moment(finished_time, 'YYYY-MM-DDTHH:mm').format(
                  'DD.MM.YY HH:mm',
                ),
              },
            }}
          />
        </>
      ) : null}
      {is_payment_required ? (
        <View style={styles.warn_cont}>
          <View
            style={[
              styles.warn_color,
              {backgroundColor: colorPalet.brandYellow},
            ]}
          />
          <Text style={styles.warn}>{t('payment_required')}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default ActionCard;
