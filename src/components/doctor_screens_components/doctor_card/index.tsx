import React, {useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Image, Text, FlatList, ImageSourcePropType} from 'react-native';
import {useAppSelector} from '../../../hooks/redux';
import {SpecialityModel} from '../../../models/ClassifiersModel';
import {DoctorModel, PriceOfSpecialityModel} from '../../../models/DoctorModel';
import {
  EmpathizeIcon,
  StarIcon,
  SuitcaseIcon,
} from '../../../resources/icons/icons';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';
import styles from './style';

interface Iprops {
  doctorData: DoctorModel<SpecialityModel> | undefined;
  workPlaceData: Array<PriceOfSpecialityModel> | undefined;
}

const DoctorCard: React.FC<Iprops> = props => {
  const {t} = useTranslation();
  const {doctorData, workPlaceData} = props;
  const {screen, lang} = useAppSelector(state => state.globalReducer);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.doctor_cont}>
          <View style={styles.image_cont}>
            <Image
              style={styles.image}
              source={
                doctorData?.photo
                  ? {uri: doctorData?.photo}
                  : require('../../../resources/images/user_logo.png')
              }
            />
          </View>
          <View style={styles.text_cont}>
            <Text style={styles.doctor_name}>{`${
              doctorData?.first_name || `${t('loading')}...`
            } ${doctorData?.last_name || ''}`}</Text>
            <Text style={styles.doctor_speciality}>
              {doctorData?.speciality[`name_${lang}`]}
            </Text>
          </View>
        </View>
        <View style={styles.info_cont}>
          <View style={styles.info_item}>
            <StarIcon width="16" height="16" color={colorPalet.black20} />
            <Text style={styles.info_text}>{doctorData?.rating}</Text>
          </View>
          <View style={styles.info_item}>
            <EmpathizeIcon width="16" height="16" color={colorPalet.black20} />
            <Text style={styles.info_text}>{doctorData?.patients_count}</Text>
          </View>
          <View style={styles.info_item}>
            <SuitcaseIcon width="16" height="16" color={colorPalet.black20} />
            <Text style={styles.info_text}>{doctorData?.experience}</Text>
          </View>
        </View>
      </View>
      {workPlaceData?.length ? (
        <FlatList
          style={styles.places_cont}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 15}}
          data={workPlaceData}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            return (
              <PlaceItem
                {...item}
                width={screen.width}
                dataLength={workPlaceData?.length}
              />
            );
          }}
        />
      ) : (
        <View style={styles.holder_cont}>
          <Text style={styles.holder_text}>{t('no_workplaces')}</Text>
        </View>
      )}
      <View style={styles.about_cont}>
        <Text style={styles.places_item_name}>{t('doctor_screen_about')}</Text>
        <Text style={styles.doctor_speciality}>{doctorData?.information}</Text>
      </View>
    </>
  );
};

interface ItemProps extends PriceOfSpecialityModel {
  dataLength?: number;
  width: number;
}

const PlaceItem = (props: ItemProps) => {
  const {price, clinic, width, dataLength} = props;
  const itemWidth =
    dataLength === 1 ? width - 40 : dataLength === 2 ? (width - 50) / 2 : 125;
  return (
    <View style={[styles.places_item_cont, {width: itemWidth}]}>
      {clinic.photo ? (
        <Image
          source={{uri: clinic.photo}}
          resizeMode="cover"
          style={styles.places_item_image}
        />
      ) : (
        <Text style={styles.places_item_name}>{clinic.name}</Text>
      )}
      <Text style={styles.places_item_price}>{`${price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} uzs`}</Text>
    </View>
  );
};

export default DoctorCard;
