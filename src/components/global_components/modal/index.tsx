import React from 'react';
import {Modal, SafeAreaView} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {useAppSelector} from '../../../hooks/redux';
import styles from './style';

interface Iprops {
  isVisible: boolean;
}

const ModalCustom: React.FC<Iprops> = props => {
  const {isVisible} = props;
  const {screen} = useAppSelector(state => state.globalReducer);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      style={styles.container}>
      <SafeAreaView style={styles.safearea}>
        <Animated.View
          style={[styles.modal_cont, {marginBottom: screen.hasNotch ? 10 : 20}]}
          entering={FadeInDown}>
          {props.children}
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
};

export default ModalCustom;
