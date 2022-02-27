import React from 'react';
import {GestureResponderEvent} from 'react-native';
import {TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Icons from '../../../resources/icons/icons';
import {colorPalet} from '../../../resources/style/globalStyle';
import styles from './style';

interface Iprops {
  icon: Icons.AllIconsType;
  onPress?: (e: GestureResponderEvent) => void;
  focused?: boolean;
}
const TabbarButton = (props: Iprops) => {
  const {icon, onPress, focused} = props;

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        colors={
          focused
            ? colorPalet.brandGradient
            : [colorPalet.white100, colorPalet.white100]
        }
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.75, y: 1.0}}>
        {React.createElement(Icons[`${icon}`], {
          color: focused ? colorPalet.white100 : colorPalet.black20,
        })}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default TabbarButton;
