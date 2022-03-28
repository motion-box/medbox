import React from 'react';
import {View} from 'react-native';
import styles from './style';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import PrescriptionItem, {
  PrescriptionItemProps,
} from '../../../components/history_screens_components/prescription_item';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '../../../hooks/redux';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import StatusBarFocus from '../../../components/global_components/StatusBarCustom';
import {colorPalet} from '../../../resources/style/globalStyle';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: {
    params: {};
  };
}

const data: PrescriptionItemProps[] = [
  {
    id: 0,
    doctor: {
      id: 0,
      imageUrl: '',
      name: 'Abduhakimova Munavvar',
      speciality: 'Cardiologist',
    },
    date: '2022-03-03',
    data: [
      {
        id: 0,
        name: 'Paracetamol (500ml)',
        period: 'Everyday, 3 times, 2 month',
        amount: 1,
        notation: 'tablet',
      },
      {
        id: 1,
        name: 'Paracetamol (500ml)',
        period: 'Everyday, 3 times, 2 month',
        amount: 25,
        notation: 'mg',
      },
      {
        id: 2,
        name: 'Omez (250mg)',
        period: 'Everyday, 2 times, 1 month',
        amount: 1,
        notation: 'tablet',
      },
    ],
  },
  {
    id: 1,
    doctor: {
      id: 0,
      imageUrl: '',
      name: 'Abduhakimova Munavvar',
      speciality: 'Cardiologist',
    },
    date: '2022-03-03',
    data: [
      {
        id: 0,
        name: 'Paracetamol (500ml)',
        period: 'Everyday, 3 times, 2 month',
        amount: 1,
        notation: 'tablet',
      },
      {
        id: 1,
        name: 'Paracetamol (500ml)',
        period: 'Everyday, 3 times, 2 month',
        amount: 25,
        notation: 'mg',
      },
      {
        id: 2,
        name: 'Omez (250mg)',
        period: 'Everyday, 2 times, 1 month',
        amount: 1,
        notation: 'tablet',
      },
    ],
  },
];

const HistoryPrescriptionScreen = ({}: ScreenProps) => {
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
      <StatusBarFocus
        translucent={true}
        backgroundColor={colorPalet.bgColor}
        barStyle="dark-content"
      />
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
          <View style={styles.container}>
            {data.map(item => (
              <React.Fragment key={item.id}>
                <PrescriptionItem {...item} />
                <View style={{height: 10}} />
              </React.Fragment>
            ))}
          </View>
        </View>
      </Animated.ScrollView>
    </>
  );
};

export default HistoryPrescriptionScreen;
