import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {CardIcon, CheckIcon} from '../../../resources/icons/icons';
import {colorPalet} from '../../../resources/style/globalStyle';
import styles from './style';

interface Iprops {
  id: number;
  cardNumber: string;
  date: string;
  isActive: boolean;
  setActive: (state: number) => void;
}

const PaymentCard: React.FC<Iprops> = props => {
  const {id, cardNumber, date, isActive, setActive} = props;

  const onPress = () => {
    setActive(id);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.container}>
      <View style={styles.left_side}>
        <CardIcon color={colorPalet.black20} />
        <View style={styles.text_cont}>
          <Text style={styles.number_text}>{cardNumber}</Text>
          <Text style={styles.date_text}>{date}</Text>
        </View>
      </View>
      {isActive ? (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <CheckIcon isGradient={true} />
        </Animated.View>
      ) : null}
    </TouchableOpacity>
  );
};

export default PaymentCard;
