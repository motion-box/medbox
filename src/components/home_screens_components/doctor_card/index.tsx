import React from 'react';
import {View, Image, TouchableOpacity, Text, Alert} from 'react-native';
import {SpecialityModel} from '../../../models/ClassifiersModel';
import {DoctorModel} from '../../../models/DoctorModel';
import {LangTypes} from '../../../models/GlobalModel';
import RatingStars from '../../global_components/rating_stars';
import styles from './style';

interface Iprops {
  lang: LangTypes;
  nagigateToDoctor: (id: number) => void;
  data: DoctorModel<SpecialityModel>;
}

const DoctorCard: React.FC<Iprops> = ({lang, data, nagigateToDoctor}) => {
  const {id, first_name, last_name, speciality, rating, photo, average_price} =
    data;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={() => nagigateToDoctor(id)}>
      <Image
        source={
          photo
            ? {uri: photo}
            : require('../../../resources/images/user_logo.png')
        }
        style={styles.image_cont}
      />
      <View style={{flex: 1}}>
        <View style={styles.line}>
          <Text style={styles.title} numberOfLines={1}>
            {first_name} {last_name}
          </Text>
          <Text style={styles.speciality}>{speciality[`name_${lang}`]}</Text>
        </View>
        <View style={styles.line}>
          <RatingStars rate={rating} />
          <Text style={styles.pice}>{`≈${average_price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} uzs`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DoctorCard;
