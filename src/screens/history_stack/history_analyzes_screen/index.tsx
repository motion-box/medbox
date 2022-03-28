import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Titler from '../../../components/global_components/titler';
import {useTranslation} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useAppSelector} from '../../../hooks/redux';
import AnalyzesItem, {
  AnayzesProps,
} from '../../../components/history_screens_components/analyzes_item';
import StatusBarFocus from '../../../components/global_components/StatusBarCustom';
import {colorPalet} from '../../../resources/style/globalStyle';
import {registerAPI} from '../../../services/RegisterService';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: {
    params: {};
  };
}

const data: AnayzesProps[] = [
  {
    type: 'ct_scan',
    title: 'CT scan',
    description:
      'Technical and Procedural Aspects of a Staged Repair of a Giant Post-Dissection',
    services: [
      {
        id: 0,
        imageUrl: '',
        name: 'Shox Internation Hospital',
        price: 200000,
      },
      {
        id: 1,
        imageUrl: '',
        name: 'AKFA Medline',
        price: 249000,
      },
    ],
    data: {images: []},
  },
  {
    type: 'ct_scan',
    title: 'CT scan',
    date: '2022-02-23T14:21',
    service: {
      id: 0,
      imageUrl: '',
      name: 'Shox Internation Hospital',
      price: 200000,
    },
    data: {images: []},
  },
  {
    type: 'ct_scan',
    doctor: {
      id: 0,
      imageUrl: '',
      name: 'Abduhakimova Munavvar',
      speciality: 'Cardiologist',
    },
    date: '2022-02-23T14:21',
    service: {
      id: 1,
      imageUrl: '',
      name: 'Shox Internation Hospital',
      price: 200000,
    },
    title: 'CT scan',
    data: {
      images: [
        require('../../../resources/images/ct_scan_1.jpg'),
        require('../../../resources/images/ct_scan_2.jpeg'),
        require('../../../resources/images/ct_scan_3.jpg'),
      ],
    },
    conclusion:
      'Technical and Procedural Aspects of a Staged Repair of a Giant Post-Dissection Aneurysm by Using Endosizing- Based Endovascular Stenting Following Aortic Surgical Repair with Simultaneous Debranching Technique',
  },
  {
    type: 'blood_test',
    title: 'Blood test',
    services: [
      {
        id: 0,
        imageUrl: '',
        name: 'Shox Internation Hospital',
        price: 200000,
      },
      {
        id: 1,
        imageUrl: '',
        name: 'AKFA Medline',
        price: 249000,
      },
    ],
    data: [
      {id: 0, name: 'Red blood cells', state: '---', notation: 'million/mm3'},
      {id: 1, name: 'White blood cells', state: '---', notation: 'mm3'},
      {id: 2, name: 'Platelets', state: '---', notation: 'mm3'},
      {id: 3, name: 'Hemoglobin', state: '---', notation: 'g/dL'},
      {id: 4, name: 'Hematocrit', state: '---', notation: '%'},
    ],
  },
  {
    type: 'blood_test',
    title: 'Blood test',
    service: {
      id: 0,
      imageUrl: '',
      name: 'Shox Internation Hospital',
      price: 200000,
    },
    data: [
      {id: 0, name: 'Red blood cells', state: '---', notation: 'million/mm3'},
      {id: 1, name: 'White blood cells', state: '---', notation: 'mm3'},
      {id: 2, name: 'Platelets', state: '---', notation: 'mm3'},
      {id: 3, name: 'Hemoglobin', state: '---', notation: 'g/dL'},
      {id: 4, name: 'Hematocrit', state: '---', notation: '%'},
    ],
  },
  {
    type: 'blood_test',
    title: 'Blood test',
    doctor: {
      id: 0,
      imageUrl: '',
      name: 'Abduhakimova Munavvar',
      speciality: 'Cardiologist',
    },
    service: {
      id: 0,
      imageUrl: '',
      name: 'Shox Internation Hospital',
      price: 200000,
    },
    data: [
      {
        id: 0,
        name: 'Red blood cells',
        state: '5.5',
        notation: 'million/mm3',
        level: 'normal',
      },
      {
        id: 1,
        name: 'White blood cells',
        state: '11,000',
        notation: 'mm3',
        level: 'high',
      },
      {
        id: 2,
        name: 'Platelets',
        state: '400,000',
        notation: 'mm3',
        level: 'above',
      },
      {
        id: 3,
        name: 'Hemoglobin',
        state: '16.0',
        notation: 'g/dL',
        level: 'below',
      },
      {id: 4, name: 'Hematocrit', state: '46', notation: '%', level: 'normal'},
    ],
    conclusion:
      'Technical and Procedural Aspects of a Staged Repair of a Giant Post-Dissection Aneurysm by Using Endosizing- Based Endovascular Stenting Following Aortic Surgical Repair with Simultaneous Debranching Technique',
  },
];

const HistoryAnalyzeScreen = ({navigation}: ScreenProps) => {
  const {t} = useTranslation();
  const {screen} = useAppSelector(state => state.globalReducer);
  const scrollY = useSharedValue(0);
  const {registerId} = useAppSelector(state => state.paramsReducer);
  const {accessData} = useAppSelector(state => state.userReducer);
  const [getAnalyzes, {isLoading}] = registerAPI.useGetAnalyzesMutation();
  // const [data, setData] = useState();

  useEffect(() => {
    navigation.addListener('focus', () => {
      getAnalyzes({
        token: accessData!.token,
        data: {register: registerId as number},
      })
        .unwrap()
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    });
  }, []);

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
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: screen.hasNotch ? 23 : 10,
        }}
        showsVerticalScrollIndicator={false}>
        <View>
          <Titler text={t('active')} />
          <View style={{height: 10}} />
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <AnalyzesItem {...item} />
              <View style={{height: 10}} />
            </React.Fragment>
          ))}
        </View>
      </Animated.ScrollView>
    </>
  );
};

export default HistoryAnalyzeScreen;
