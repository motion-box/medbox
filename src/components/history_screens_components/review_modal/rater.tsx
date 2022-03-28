import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {StarIcon} from '../../../resources/icons/icons';
import {colorPalet} from '../../../resources/style/globalStyle';

interface Iprops {
  stars: number;
  setStars: (state: number) => void;
}

const Rater: React.FC<Iprops> = ({stars, setStars}) => {
  const onPress = (index: number) => {
    setStars(index);
  };
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map(item => (
        <Star
          key={item}
          isActive={item <= stars}
          onPress={() => onPress(item)}
        />
      ))}
    </View>
  );
};

interface StarProps {
  isActive: boolean;
  onPress: () => void;
}
const Star = ({isActive, onPress}: StarProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <StarIcon
        isGradient={isActive}
        color={colorPalet.black20}
        width="24"
        height="24"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 50,
  },
});

export default Rater;
