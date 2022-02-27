import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';

interface Iprops {
  text: string;
  subtext?: string;
  onPress?: () => void;
}

const Titler: React.FC<Iprops> = props => {
  const {text, onPress, subtext} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      {subtext && (
        <TouchableOpacity style={styles.button} onPress={onPress && onPress}>
          <Text style={styles.button_text}>{subtext}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Titler;
