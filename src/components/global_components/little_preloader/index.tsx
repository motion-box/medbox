import React from 'react';
import LottieView from 'lottie-react-native';

interface Iprops {
  scale?: number;
}
const LittlePreloader = ({scale}: Iprops) => {
  return (
    <LottieView
      source={require('../../../resources/lottie/heart-preloader.json')}
      loop
      autoPlay
      style={{
        transform: [{scale: scale || 0.4}],
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  );
};
export default LittlePreloader;
