import React, {useEffect, useState} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import styles from './style';
import * as Icons from '../../../resources/icons/icons';
import {colorPalet} from '../../../resources/style/globalStyle';
import Animated, {
  FadeInUp,
  FadeOutDown,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface Iprops {
  text: string;
  setText: (text: string) => void;
  placeholder: string;
  options?: {
    maxLength?: number;
    immutable?: boolean;
    type?: 'default' | 'numeric' | 'number-pad' | 'email-address';
    secure?: boolean;
    icon?: Icons.AllIconsType;
    error?: boolean;
  };
}

const Input: React.FC<Iprops> = props => {
  const {text, setText, placeholder, options} = props;
  const [secure, setSecure] = useState(options?.secure);
  const x = useSharedValue(0);

  useEffect(() => {
    if (options?.error) {
      x.value = withSpring(-3);
      setTimeout(() => {
        x.value = withSpring(3);
      }, 200);
      setTimeout(() => {
        x.value = withSpring(0);
      }, 400);
    }
  }, [options?.error]);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: x.value}],
    };
  });

  return (
    <Animated.View style={[styles.container, rStyle]}>
      <TextInput
        textContentType={options?.secure ? 'newPassword' : undefined}
        value={text}
        maxLength={options?.maxLength}
        onChange={e => setText(e.nativeEvent.text)}
        keyboardType={options?.type || 'default'}
        secureTextEntry={secure || false}
        editable={!options?.immutable}
        autoCapitalize={options?.type === 'email-address' ? 'none' : undefined}
        style={[
          styles.input,
          {
            color: options?.immutable
              ? colorPalet.black50
              : colorPalet.black100,
            paddingRight: options?.icon ? 50 : 20,
            borderWidth: 2,
            borderColor: options?.error
              ? colorPalet.inputError
              : colorPalet.white100,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={colorPalet.black20}
      />
      {options?.icon && (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.icon}
          onPressIn={() => options.secure && setSecure(false)}
          onPressOut={() => options.secure && setSecure(true)}>
          {React.createElement(Icons[options?.icon], {
            width: '16',
            height: '16',
            color: colorPalet.black20,
          })}
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

export default Input;
