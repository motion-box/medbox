import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './style';
import {
  colorPalet,
  colorPaletTypes,
} from '../../../resources/style/globalStyle';

interface Iprops {
  text: string;
  onPress: () => void;
  options?: {
    color?: colorPaletTypes;
    textColor?: colorPaletTypes;
    textSize?: 12 | 14;
    buttonWidth?: number | '100%';
    buttonHeight?: number;
    buttonFlex?: 0 | 1;
    borderRadius?: 10 | 5;
  };
}

const Button: React.FC<Iprops> = props => {
  const {text, onPress, options} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.button,
        {
          backgroundColor: colorPalet[options?.color || 'black100'],
          width: options?.buttonWidth || 'auto',
          height: options?.buttonHeight || 30,
          flex: options?.buttonFlex || 0,
          borderRadius: options?.borderRadius || 5,
        },
      ]}>
      <Text
        style={[
          styles.text,
          {
            color: colorPalet[options?.textColor || 'white100'],
            fontSize: options?.textSize || 12,
          },
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
