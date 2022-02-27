import React from 'react';
import {Modal, SafeAreaView} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import styles from './style';

interface Iprops {
  isVisible: boolean;
}

const ModalCustom: React.FC<Iprops> = props => {
  const {isVisible} = props;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      style={styles.container}>
      <SafeAreaView style={styles.safearea}>
        <Animated.View style={styles.modal_cont} entering={FadeInDown}>
          {props.children}
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
};

export default ModalCustom;
