import React from 'react';
import {View, Text} from 'react-native';
import * as Icons from '../../../resources/icons/icons';
import {
  colorPalet,
  colorPaletTypes,
  fonts,
} from '../../../resources/style/globalStyle';

interface Iprops {
  text: string;
  icon: Icons.AllIconsType;
  options?: {
    icon?: {
      width: string;
      height: string;
    };
    color?: colorPaletTypes;
    fontSize?: number;
  };
}

const EmptyEvent: React.FC<Iprops> = props => {
  const {text, icon, options} = props;
  return (
    <View
      style={{
        alignItems: 'center',
        marginVertical: 20,
      }}>
      {React.createElement(Icons[`${icon}`], {
        width: options?.icon?.width || '30',
        height: options?.icon?.height || '30',
        color: colorPalet[`${options?.color || 'black20'}`],
      })}
      <Text
        style={{
          fontSize: options?.fontSize || 12,
          color: colorPalet[`${options?.color || 'black20'}`],
          fontFamily: fonts.sf_medium,
          marginTop: 10,
        }}>
        {text}
      </Text>
    </View>
  );
};

export default EmptyEvent;
