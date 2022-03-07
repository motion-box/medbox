import React from 'react';
import {Text, View, Image} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import {
  colorPaletTypes,
  colorPalet,
} from '../../../resources/style/globalStyle';

interface Iprops {
  imageUrl: string;
  name: string;
  price: number;
  color: colorPaletTypes;
}

const HospitalInfo: React.FC<Iprops> = props => {
  const {imageUrl, name, price, color} = props;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../../resources/images/shoxmed_little.png')}
      />
      <View style={styles.name_cont}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="clip">
          {name}
        </Text>
        <LinearGradient
          colors={['rgba(246,250,250,0)', 'rgba(246,250,250,1)']}
          useAngle={true}
          angle={90}
          angleCenter={{x: 0.2, y: 0}}
          style={styles.name_cliper}
        />
      </View>
      <Text style={styles.price}>{`${price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} uzs`}</Text>
    </View>
  );
};

export default HospitalInfo;
