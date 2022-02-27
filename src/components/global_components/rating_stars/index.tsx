import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import {StarIcon} from '../../../resources/icons/icons';
import {colorPalet} from '../../../resources/style/globalStyle';

interface Iprops {
  rate: number;
  textAcitve?: boolean;
}

const RatingStars: React.FC<Iprops> = props => {
  const {rate, textAcitve = true} = props;
  const mapStars = [1, 2, 3, 4, 5].map(item => {
    return (
      <React.Fragment key={item}>
        <StarIcon
          width="12"
          height="12"
          isGradient={item <= rate}
          color={colorPalet.black20}
        />
        <View style={{width: 2}} />
      </React.Fragment>
    );
  });
  return (
    <View style={styles.container}>
      <View style={styles.star_cont}>{mapStars}</View>
      {textAcitve && (
        <Text style={styles.number}>
          {Number.isInteger(rate) ? `${rate}.0` : rate}
        </Text>
      )}
    </View>
  );
};

export default RatingStars;
