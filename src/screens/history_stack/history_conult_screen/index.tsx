import React, {useEffect} from 'react';
import {View} from 'react-native';
import styles from './style';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Titler from '../../../components/global_components/titler';
import {useTranslation} from 'react-i18next';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import ConsultationItem from '../../../components/history_screens_components/consultation_item';
import {paramsSlice} from '../../../store/reducers/ParamsSlice';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: {
    params: {};
  };
}

const HistoryConsultScreen = ({}: ScreenProps) => {
  const {t} = useTranslation();
  const {screen} = useAppSelector(state => state.globalReducer);
  const scrollY = useSharedValue(0);

  // opacity animation
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollY.value = e.contentOffset.y;
    },
  });
  const shadow = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 10],
      [0, 1],
      Extrapolate.CLAMP,
    );
    return {
      opacity: opacity,
    };
  });

  return (
    <>
      <Animated.View
        style={[shadow, styles.shadow, {width: screen.width}]}
        pointerEvents="none">
        <LinearGradient
          colors={['rgba(0,0,0,0.08)', 'rgba(0,0,0,0)']}
          style={{width: '100%', height: '100%'}}
        />
      </Animated.View>
      <Animated.ScrollView
        style={styles.container}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{paddingTop: 10, paddingBottom: 33}}
        showsVerticalScrollIndicator={false}>
        <View>
          <Titler text={t('patient_history_active')} />
          <View style={{height: 10}} />
          <ConsultationItem data={{type: 'offline', card: 'bookDoctor'}} />
          <View style={{height: 10}} />
          <ConsultationItem data={{type: 'online', card: 'notPaid'}} />
          <View style={{height: 10}} />
          <ConsultationItem data={{type: 'offline', card: 'notTime'}} />
          <View style={{height: 10}} />
          <ConsultationItem data={{type: 'online', card: 'time'}} />
          <View style={{height: 10}} />
          <ConsultationItem data={{type: 'offline', card: 'bookNoDoctor'}} />
          <View style={{height: 10}} />
          <Titler text={t('patient_history_history')} />
          <View style={{height: 10}} />
          <ConsultationItem data={{type: 'offline', card: 'closed'}} />
        </View>
      </Animated.ScrollView>
    </>
  );
};

export default HistoryConsultScreen;
