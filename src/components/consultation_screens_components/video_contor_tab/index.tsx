import React from 'react';
import {View, TouchableOpacity, Dimensions} from 'react-native';
import {useAppSelector} from '../../../hooks/redux';
import {
  MicOffIcon,
  PhoneIcon,
  VideoOffIcon,
} from '../../../resources/icons/icons';
import {BlurView} from '@react-native-community/blur';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import {colorPalet} from '../../../resources/style/globalStyle';

interface Iprops {}

const {width} = Dimensions.get('window');
const itemWidth = (width - 62.5) / 3;

const VideoControlTab: React.FC<Iprops> = props => {
  const {} = props;
  const {screen, os} = useAppSelector(state => state.globalReducer);
  return (
    <View
      style={[
        styles.container,
        {width: screen.width - 40, bottom: screen.hasNotch ? 33 : 20},
      ]}>
      <View style={styles.buttons_container}>
        <TouchableOpacity>
          <View style={[styles.button, {width: itemWidth}]}>
            <VideoOffIcon color={colorPalet.black20} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <LinearGradient
            colors={colorPalet.redGradient}
            useAngle={true}
            angle={150}
            angleCenter={{x: 0.4, y: 1}}
            style={{
              width: itemWidth,
              marginHorizontal: 2.5,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 15,
            }}>
            <PhoneIcon color={colorPalet.white100} />
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={[styles.button, {width: itemWidth}]}>
            <MicOffIcon
              color={colorPalet.black20}
              isGradient={true}
              gradientColor={colorPalet.redGradient}
            />
          </View>
        </TouchableOpacity>
      </View>
      {os === 'ios' ? (
        <BlurView
          style={styles.background}
          blurType="light"
          blurAmount={20}
          blurRadius={20}
          reducedTransparencyFallbackColor="white"
        />
      ) : (
        <View
          style={[
            styles.background,
            {
              backgroundColor: 'rgba(255,255,255,0.8)',
            },
          ]}></View>
      )}
    </View>
  );
};

export default VideoControlTab;
