import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import {useAppSelector} from '../../../hooks/redux';
import * as Icons from '../../../resources/icons/icons';
import {
  colorPalet,
  colorPaletTypes,
} from '../../../resources/style/globalStyle';
import SearchAnimated from '../search_animated';
import {Button, HeaderContent} from './header_types';
import styles from './style';

interface Iprops {
  scrollY: Animated.SharedValue<number>;
  externalCompnent?: React.ComponentElement<any, any>;
  options: {
    title: string;
    subtitle?: string;
    bigAlign?: AlignTypes;
    smallAlign?: AlignTypes;
    left?: BtnProps;
    right?: BtnProps;
  };
}
type AlignTypes = 'center' | 'left' | 'right';

type BtnProps = {
  image?: string;
  icon?: Icons.AllIconsType;
  iconColor?: colorPaletTypes;
  iconRotate?: '0' | '90' | '180' | '270';
  isGradient?: boolean;
  backgroundColor: colorPaletTypes;
  onPress: () => void;
};

const Header = (props: Iprops) => {
  const {scrollY, externalCompnent, options} = props;
  const {screen} = useAppSelector(state => state.globalReducer);

  const headStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, 100],
      [90, 50],
      Extrapolation.CLAMP,
    );
    return {
      height: height,
    };
  });

  const gradStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 20],
      [0, 1],
      Extrapolation.CLAMP,
    );
    return {
      opacity: opacity,
    };
  });

  return (
    <View
      style={[
        styles.container,
        {
          width: screen.width,
        },
      ]}>
      <Animated.View style={[headStyle, styles.header_cont]}>
        {options.left && (
          <Button
            scrollY={scrollY}
            onPress={options.left.onPress}
            options={{
              image: options.left.image,
              icon: options.left.icon,
              iconColor: options.left.iconColor,
              iconRotate: options.left.iconRotate,
              isGradient: options.left.isGradient,
              backgroundColor: options.left.backgroundColor,
              marginRight: 10,
            }}
          />
        )}
        <HeaderContent
          scrollY={scrollY}
          bigAlign={options.bigAlign || 'left'}
          smallAlign={options.smallAlign || 'left'}
          title={options.title}
          subtitle={options?.subtitle || null}
        />
        {options.right && (
          <Button
            scrollY={scrollY}
            onPress={options.right.onPress}
            options={{
              image: options.right.image,
              icon: options.right.icon,
              iconColor: options.right.iconColor,
              iconRotate: options.right.iconRotate,
              isGradient: options.right.isGradient,
              backgroundColor: options.right.backgroundColor,
              marginLeft: 10,
            }}
          />
        )}
      </Animated.View>
      {externalCompnent && externalCompnent}
      <Animated.View style={[styles.grad_cont, gradStyle]} pointerEvents="none">
        <LinearGradient
          colors={['rgba(0,0,0, 0.08)', 'rgba(0,0,0, 0)']}
          style={styles.grad}
        />
      </Animated.View>
    </View>
  );
};

export default Header;
