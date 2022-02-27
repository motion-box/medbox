import {TFunctionResult} from 'i18next';
import React, {useEffect} from 'react';
import {Text} from 'react-native';
import Animated, {FadeInDown, FadeOutUp} from 'react-native-reanimated';
import {colorPalet} from '../../../resources/style/globalStyle';
import styles from './style';

interface Iprops {
  text: string | TFunctionResult | false;
  setText: (state: false) => void;
  isDark?: boolean;
}

const DialogPopup: React.FC<Iprops> = props => {
  const {text, setText, isDark = false} = props;

  useEffect(() => {
    setTimeout(() => {
      setText(false);
    }, 1000);
  }, []);
  return (
    <Animated.View
      entering={FadeInDown}
      exiting={FadeOutUp}
      style={[
        styles.container,
        {backgroundColor: isDark ? colorPalet.black20 : colorPalet.white50},
      ]}>
      <Text
        numberOfLines={1}
        style={[
          styles.text,
          {color: isDark ? colorPalet.white100 : colorPalet.black50},
        ]}>
        {text}
      </Text>
    </Animated.View>
  );
};

export default DialogPopup;
