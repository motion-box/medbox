import React from 'react';
import {View, Image, TouchableOpacity, Text, Alert} from 'react-native';
import RatingStars from '../../global_components/rating_stars';
import styles from './style';

interface Iprops {
  nagigateToDoctor: (id: string) => void;
  data: {
    id: string;
    name: string;
    speciality: string;
    price: number;
    rate: number;
    imageUrl: string;
  };
}

const DoctorCard: React.FC<Iprops> = ({data, nagigateToDoctor}) => {
  const {id, name, speciality, price, rate} = data;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      // onPress={() => Alert.alert('ID: ' + id + ' ||| Name: ' + name)}
      onPress={() => nagigateToDoctor(id)}>
      <Image
        source={require('../../../resources/images/nurse2.png')}
        style={styles.image_cont}
      />
      <View style={{flex: 1}}>
        <View style={styles.line}>
          <Text style={styles.title} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.speciality}>{speciality}</Text>
        </View>
        <View style={styles.line}>
          <RatingStars rate={rate} />
          <Text style={styles.pice}>{`≈${price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} uzs`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DoctorCard;
