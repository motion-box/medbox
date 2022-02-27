import React, {useEffect, useState} from 'react';
import {View, Pressable} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {GranientFindText} from '../../../resources/icons/gradientTexts';
import styles from './style';

interface Iprops {
  isActive: boolean;
  onPress: () => void;
}

const FindButton: React.FC<Iprops> = props => {
  const {onPress, isActive} = props;
  const scale = useSharedValue(1);

  useEffect(() => {
    if (!isActive) scale.value = withTiming(1);
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  const onButtonPressed = () => {
    scale.value = withTiming(16, {duration: 1000});
    onPress();
  };
  return (
    <Animated.View style={animatedStyle}>
      <Pressable style={styles.container} onPress={onButtonPressed}>
        <View style={styles.middle}>
          <View style={styles.front}>
            {!isActive && (
              <Animated.View
                entering={FadeIn.duration(500).delay(200)}
                exiting={FadeOut.duration(100)}>
                <GranientFindText />
              </Animated.View>
            )}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default FindButton;
