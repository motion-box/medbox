import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import * as Icons from '../../../../resources/icons/icons';
import {
  colorPalet,
  colorPaletTypes,
} from '../../../../resources/style/globalStyle';
import styles from './style';

interface ContentProps {
  title: string;
  subtitle: string | null;
  scrollY: Animated.SharedValue<number>;
  bigAlign: AlignTypes;
  smallAlign: AlignTypes;
}
type AlignTypes = 'center' | 'left' | 'right';

export const HeaderContent: React.FC<ContentProps> = props => {
  const {title, subtitle, scrollY, bigAlign, smallAlign} = props;

  const bigStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 50],
      [1, 0],
      Extrapolation.CLAMP,
    );
    return {
      opacity: opacity,
    };
  });
  const smallStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [50, 100],
      [0, 1],
      Extrapolation.CLAMP,
    );
    return {
      opacity: opacity,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[bigStyle, styles.content_cont]}>
        <Text
          style={[styles.title, {textAlign: bigAlign}]}
          numberOfLines={1}
          ellipsizeMode="clip">
          {title}
        </Text>
        {subtitle !== null && (
          <Text
            style={[styles.subtitle, {textAlign: bigAlign}]}
            numberOfLines={1}
            ellipsizeMode="clip">
            {subtitle}
          </Text>
        )}
        <LinearGradient
          colors={['rgba(246, 250, 250, 0)', 'rgba(246, 250, 250, 1)']}
          start={{x: 0, y: 10}}
          end={{x: 0.8, y: 10}}
          style={styles.grad}
        />
      </Animated.View>
      <Animated.View style={[smallStyle, styles.content_cont]}>
        <Text
          style={[styles.title_small, {textAlign: smallAlign}]}
          numberOfLines={1}>
          {title}
        </Text>
      </Animated.View>
    </View>
  );
};

type BtnTypes = {
  scrollY: Animated.SharedValue<number>;
  onPress: () => void;
  options?: {
    icon?: Icons.AllIconsType;
    backgroundColor?: colorPaletTypes;
    iconRotate?: '0' | '90' | '180' | '270';
    isGradient?: boolean;
    iconColor?: colorPaletTypes;
    image?: string;
    marginLeft?: 10 | 0;
    marginRight?: 10 | 0;
  };
};
interface BtnProps extends BtnTypes {}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export const Button = ({scrollY, onPress, options}: BtnProps) => {
  const rStyle = useAnimatedStyle(() => {
    const wh = interpolate(
      scrollY.value,
      [0, 100],
      [50, 30],
      Extrapolation.CLAMP,
    );
    const borderRadius = interpolate(
      scrollY.value,
      [0, 100],
      [10, 5],
      Extrapolation.CLAMP,
    );
    return {
      width: wh,
      height: wh,
      borderRadius: borderRadius,
      backgroundColor: colorPalet[options?.backgroundColor || 'white100'],
    };
  });
  const iStyle = useAnimatedStyle(() => {
    const wh = interpolate(
      scrollY.value,
      [0, 100],
      [options?.isGradient ? 30 : 24, 18],
      Extrapolation.CLAMP,
    );
    return {
      width: wh,
      height: wh,
    };
  });

  return (
    <AnimatedTouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        rStyle,
        styles.button,
        {
          marginLeft: options?.marginLeft || 0,
          marginRight: options?.marginRight || 0,
        },
      ]}>
      {options?.icon && (
        <Animated.View style={iStyle}>
          {React.createElement(Icons[options.icon], {
            width: '100%',
            height: '100%',
            color: colorPalet[options.iconColor || 'black100'],
            isGradient: options.isGradient,
            rotate: options.iconRotate,
          })}
        </Animated.View>
      )}
      {options?.image && (
        <Animated.Image
          style={rStyle}
          source={require('../../../../resources/images/img.png')}
        />
      )}
    </AnimatedTouchableOpacity>
  );
};
