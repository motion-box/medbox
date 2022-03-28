import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useAppSelector} from '../../../../hooks/redux';
import {SpecialityModel} from '../../../../models/ClassifiersModel';
import {DoctorModel} from '../../../../models/DoctorModel';
import {NavigatorTypes} from '../../../../navigation';
import {colorPalet, fonts} from '../../../../resources/style/globalStyle';
import {doctorAPI} from '../../../../services/DoctorService';
import Button from '../../../global_components/button';
import CardTitler from '../../../global_components/card_titler';
import LittlePreloader from '../../../global_components/little_preloader';
import OnlineOffline from '../../online_offline';

interface Iprops {
  type: 'online' | 'offline';
  speciality: string;
  specialityId: number;
  description: string;
  consultationId: number;
}

const ChooseDoctorItem: React.FC<Iprops> = props => {
  const {t} = useTranslation();
  const {type, speciality, description, specialityId, consultationId} = props;
  const {lang} = useAppSelector(state => state.globalReducer);
  const {accessData} = useAppSelector(state => state.userReducer);
  const {registerId} = useAppSelector(state => state.paramsReducer);
  const [getDoctors, {isLoading}] = doctorAPI.useSearchDoctorMutation();
  const [recommendedDoctors, setRecommendedDoctor] = useState<
    Array<DoctorModel<SpecialityModel>>
  >([]);
  const [doctorsArr, setDoctorsArr] = useState<
    Array<DoctorModel<SpecialityModel>>
  >([]);
  const navigation = useNavigation<StackNavigationProp<any, any>>();

  useEffect(() => {
    getDoctors({
      token: accessData!.token,
      params: {
        speciality: specialityId,
      },
    })
      .unwrap()
      .then(res => {
        if (res.length) {
          var sorted = res.slice(0, 2);
          setRecommendedDoctor(sorted);
          setDoctorsArr(res);
        }
      })
      .catch(e => console.log(e));
  }, []);

  return (
    <View>
      <View style={styles.title_cont}>
        <Text style={styles.title}>{speciality}</Text>
        <View style={styles.right_cont}>
          <OnlineOffline type={type} />
        </View>
      </View>
      <Text style={styles.description}>{description}</Text>
      <Text style={[styles.title, {marginVertical: 10}]}>{t('doctors')}</Text>
      {recommendedDoctors.length ? (
        <View style={styles.doctors_cont}>
          {recommendedDoctors.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.doctor_item,
                {
                  borderBottomWidth:
                    index !== recommendedDoctors.length - 1 ? 0.4 : 0,
                },
              ]}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate(NavigatorTypes.doctorStack.doctorScreen, {
                  id: item.id,
                  read_only: false,
                  creatingData: {
                    registerId: registerId,
                    specialityId: specialityId,
                    consultationId: consultationId,
                  },
                  popNumber: 1,
                })
              }>
              <CardTitler
                imageUrl={item.photo}
                name={`${item.first_name} ${item.last_name}`}
                stars={item.rating as 1}
                clipper="bg"
                right={{
                  boldSecond: {
                    title: item.speciality[`name_${lang}`],
                    subtitle: `≈${item.average_price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} uzs`,
                  },
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.preloader_cont}>
          <LittlePreloader scale={0.6} />
        </View>
      )}
      <View style={{height: 10}} />
      <Button
        text={t('show_more')}
        onPress={() =>
          navigation.navigate(NavigatorTypes.stacks.showMoreScreen, {
            title: recommendedDoctors[0].speciality[`name_${lang}`],
            data: doctorsArr,
            type: 'doctor',
            creatingData: {
              registerId: registerId,
              specialityId: specialityId,
              consultationId: consultationId,
            },
          })
        }
        options={{
          buttonWidth: '100%',
          buttonHeight: 40,
        }}
      />
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
  preloader_cont: {
    height: 112,
    backgroundColor: colorPalet.bgColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChooseDoctorItem;
