import React, {useRef, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './style';
import {
  CloseIcon,
  DeleteBackIcon,
  SearchIcon,
} from '../../../resources/icons/icons';
import {colorPalet} from '../../../resources/style/globalStyle';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface Iprops {
  scrollY: Animated.SharedValue<number>;
  text: string;
  setText: (text: string) => void;
  isFocuse: boolean;
  setFocuse: (state: boolean) => void;
  placeholder: string;
  options?: {
    paddingHorizontal?: number;
  };
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const SearchAnimated: React.FC<Iprops> = props => {
  const {scrollY, text, setText, placeholder, isFocuse, setFocuse, options} =
    props;
  const ref = useRef<TextInput>(null);

  // height animation
  const hStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, 100],
      [40, isFocuse ? 40 : 0],
      Extrapolation.CLAMP,
    );
    return {
      height: height,
    };
  });
  // container animation
  const cStyle = useAnimatedStyle(() => {
    const margin = interpolate(
      scrollY.value,
      [30, 100],
      [20, isFocuse ? 10 : 0],
      Extrapolation.CLAMP,
    );
    const opacity = interpolate(
      scrollY.value,
      [30, 100],
      [1, isFocuse ? 1 : 0],
      Extrapolation.CLAMP,
    );
    return {
      marginBottom: margin,
      opacity: opacity,
    };
  });
  const iStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 30],
      [1, isFocuse ? 1 : 0],
      Extrapolation.CLAMP,
    );
    return {
      opacity: opacity,
    };
  });

  const buttonPress = () => {
    if (text.length > 0) onClearPress();
    else onClosePress();
  };
  const onClosePress = () => {
    if (ref.current) {
      ref.current.blur();
      setFocuse(false);
    }
  };
  const onClearPress = () => {
    if (ref.current) {
      ref.current.clear();
      setText('');
    }
  };
  return (
    <Animated.View style={[cStyle, hStyle, styles.container]}>
      <View>
        <AnimatedTextInput
          ref={ref}
          style={[iStyle, styles.input]}
          placeholder={placeholder}
          onChange={e => setText(e.nativeEvent.text)}
          onFocus={() => setFocuse(true)}
        />
        <Animated.View
          style={[hStyle, iStyle, styles.icons_cont]}
          pointerEvents="box-none">
          <SearchIcon width="16" height="16" color={colorPalet.black50} />
          <AnimatedTouchableOpacity
            style={[styles.close_btn]}
            onPress={buttonPress}>
            {isFocuse && (
              <>
                {text.length > 0 ? (
                  <DeleteBackIcon
                    width="16"
                    height="16"
                    color={colorPalet.black50}
                  />
                ) : (
                  <CloseIcon
                    width="16"
                    height="16"
                    color={colorPalet.black50}
                  />
                )}
              </>
            )}
          </AnimatedTouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export default SearchAnimated;
