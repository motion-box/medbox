import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
//@ts-ignore
import {Voximplant} from 'react-native-voximplant';
import {OSTypes, ScreenTypes} from '../../../models/GlobalModel';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeInUp,
  FadeOutDown,
  Layout,
} from 'react-native-reanimated';
import {BlurView} from '@react-native-community/blur';

interface Iprops {
  streamId: string;
  screen: ScreenTypes;
  os: OSTypes;
  isVideo: boolean;
}

const LocalVideoView: React.FC<Iprops> = props => {
  const {streamId, screen, os, isVideo} = props;
  return (
    <Animated.View
      style={[styles.container, {bottom: screen.hasNotch ? 113 : 100}]}
      layout={Layout}>
      <View style={styles.timer_cont}>
        <Text style={styles.timer}>20:39</Text>
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
      {isVideo ? (
        <Animated.View
          style={[styles.video_cont]}
          entering={FadeIn}
          exiting={FadeOutDown}>
          <Voximplant.VideoView
            videoStreamId={streamId}
            showOnTop={true}
            scaleType={
              os === 'ios'
                ? Voximplant.RenderScaleType.SCALE_FIT
                : Voximplant.RenderScaleType.SCALE_FILL
            }
            style={styles.video}
          />
        </Animated.View>
      ) : (
        <View />
      )}
    </Animated.View>
  );
};
export default LocalVideoView;
