import React, {useEffect, useState} from 'react';
import {View, Modal} from 'react-native';
import styles from './style';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useAppSelector} from '../../../hooks/redux';

interface Iprops {
  isVisible: boolean;
  setVisible: (state: boolean) => void;
  isModal: boolean;
}

const BottomSheetModal: React.FC<Iprops> = props => {
  const {isVisible, setVisible, isModal} = props;
  const {screen} = useAppSelector(state => state.globalReducer);
  const y = useSharedValue(screen.height);

  useEffect(() => {
    if (isModal) {
      y.value = withTiming(0, {duration: 500});
    } else if (isModal === false) {
      hideModal();
    }
  }, [isModal]);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: y.value}],
    };
  });

  const hideModal = () => {
    y.value = withTiming(screen.height, {duration: 500});
    setTimeout(() => {
      setVisible(false);
    }, 250);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      style={styles.container}>
      <Animated.View style={styles.background}>
        <Animated.View style={[styles.modal_cont, rStyle]}>
          {props.children}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};
export default BottomSheetModal;
