import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {CircleIcon} from '../../../resources/icons/icons';
import {
  colorPalet,
  colorPaletTypes,
} from '../../../resources/style/globalStyle';
import styles from './style';

interface Iprops {
  data: string[];
  bgColor?: colorPaletTypes;
  onSelect: (state: number) => void;
}

const RadioSelector: React.FC<Iprops> = props => {
  const {data, bgColor, onSelect} = props;

  const [activeIndex, setActiveIndex] = useState(0);

  const select = (index: number) => {
    onSelect(index);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <Card
        text={data[0]}
        bgColor={bgColor || 'white100'}
        isActive={activeIndex === 0}
        onPress={() => select(0)}
      />
      <View style={{width: 10}} />
      <Card
        text={data[1]}
        bgColor={bgColor || 'white100'}
        isActive={activeIndex === 1}
        onPress={() => select(1)}
      />
    </View>
  );
};

interface CardProps {
  isActive: boolean;
  onPress: () => void;
  text: string;
  bgColor: colorPaletTypes;
}

const Card = ({isActive, onPress, text, bgColor}: CardProps) => {
  return (
    <Pressable
      style={[styles.card, {backgroundColor: colorPalet[bgColor]}]}
      onPress={onPress}>
      {isActive ? <CircleIcon isGradient /> : <View style={[styles.circle]} />}
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default RadioSelector;
