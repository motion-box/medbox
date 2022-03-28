import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useAppSelector} from '../../../hooks/redux';

const styles = StyleSheet.create({
  aim_cont: {
    position: 'absolute',
  },
  aim: {
    width: 40,
    height: 40,
  },
});

interface Iprops {
  animValue: SharedValue<number>;
}

const MapAim = ({animValue}: Iprops) => {
  const {screen} = useAppSelector(state => state.globalReducer);
  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animValue.value,
      [0, 1],
      [1, 1.2],
      Extrapolation.EXTEND,
    );
    const rotate = interpolate(
      animValue.value,
      [0, 1],
      [0, 180],
      Extrapolation.EXTEND,
    );
    return {
      transform: [{scale: scale}, {rotate: `${rotate}deg`}],
    };
  });
  return (
    <Animated.View
      pointerEvents="none"
      style={[
        rStyle,
        styles.aim_cont,
        {
          top: screen.height / 2 - 20,
          left: screen.width / 2 - 20,
        },
      ]}>
      <Image
        style={styles.aim}
        source={require('../../../resources/images/map_images/map_aim.png')}
      />
    </Animated.View>
  );
};

export default MapAim;
