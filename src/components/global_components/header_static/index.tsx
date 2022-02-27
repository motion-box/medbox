import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import * as Icons from '../../../resources/icons/icons';
import {
  colorPalet,
  colorPaletTypes,
} from '../../../resources/style/globalStyle';

interface Iprops {
  text?: string;
  options?: {
    textColor?: colorPaletTypes;
    leftButton?: buttonType;
    rightButton?: buttonType;
  };
}

type buttonType = {
  background?: colorPaletTypes;
  icon?: Icons.AllIconsType;
  iconColor?: colorPaletTypes;
  iconRotate?: 0 | 90 | 180 | 270;
  press?: () => void;
};

const HeaderStatic: React.FC<Iprops> = props => {
  const {text, options} = props;
  return (
    <View style={[styles.container, {marginTop: 20}]}>
      {options?.leftButton && <Button {...options?.leftButton} />}
      <Text
        style={[
          styles.text,
          {color: colorPalet[options?.textColor || 'black100']},
        ]}>
        {text}
      </Text>
      {options?.rightButton && <Button {...options?.rightButton} />}
    </View>
  );
};

const Button = ({
  background,
  icon,
  iconColor,
  iconRotate,
  press,
}: buttonType) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={press}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: colorPalet[background || 'white100'],
      }}>
      {React.createElement(Icons[icon || 'ArrowIcon'], {
        width: '24',
        height: '24',
        color: colorPalet[iconColor || 'black100'],
        rotate: `${iconRotate || 0}`,
      })}
    </TouchableOpacity>
  );
};

export default HeaderStatic;
