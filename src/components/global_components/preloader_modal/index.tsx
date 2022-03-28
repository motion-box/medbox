import React from 'react';
import {Modal, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {useAppSelector} from '../../../hooks/redux';
import {colorPalet} from '../../../resources/style/globalStyle';

const PreloaderModal = () => {
  const {isLoading} = useAppSelector(state => state.paramsReducer);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isLoading}
      style={{
        width: '100%',
        height: '100%',
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colorPalet.black20,
        }}>
        <LottieView
          source={require('../../../resources/lottie/preloader.json')}
          loop
          autoPlay
          style={{
            transform: [{scale: 0.8}],
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </View>
    </Modal>
  );
};

export default PreloaderModal;
