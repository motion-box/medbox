import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './style';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Titler from '../../../components/global_components/titler';
import {useTranslation} from 'react-i18next';
import Animated, {
  Extrapolate,
  FadeInUp,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import ConsultationItem from '../../../components/history_screens_components/consultation_item';
import ReviewModal from '../../../components/history_screens_components/review_modal';
import StatusBarFocus from '../../../components/global_components/StatusBarCustom';
import {colorPalet} from '../../../resources/style/globalStyle';
import {paramsSlice} from '../../../store/reducers/ParamsSlice';
import {registerAPI} from '../../../services/RegisterService';
import {ConsultationModel} from '../../../models/HistoryItemsModel';
import LittlePreloader from '../../../components/global_components/little_preloader';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: {
    params: {
      id: number;
    };
  };
}

const HistoryConsultScreen = ({navigation, route}: ScreenProps) => {
  const {t} = useTranslation();
  const {screen, lang} = useAppSelector(state => state.globalReducer);
  const {accessData} = useAppSelector(state => state.userReducer);
  const {registerId} = useAppSelector(state => state.paramsReducer);
  const scrollY = useSharedValue(0);
  const [isModal, setModal] = useState(false);
  const [modalData, setModalData] = useState<{
    id: number;
    full_name: string;
    image: string | undefined;
    speciality: string;
    isEstimate: boolean;
    consultationId: number;
  } | null>(null);
  const dispatch = useAppDispatch();
  const {setRegisterId} = paramsSlice.actions;
  const [getConsultations, {isLoading}] =
    registerAPI.useGetConsultationsMutation();
  const [consultationsData, setConsultationsData] = useState<
    Array<ConsultationModel>
  >([]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      if (registerId) {
        getConsult(registerId);
      }
    });
    navigation.addListener('beforeRemove', () => {
      dispatch(setRegisterId(null));
    });

    return () => {
      navigation.removeListener('focus', () => {
        if (registerId) {
          getConsult(registerId);
        }
      });
      navigation.removeListener('beforeRemove', () => {
        dispatch(setRegisterId(null));
      });
    };
  }, []);

  const getConsult = (registerId: number) => {
    getConsultations({token: accessData!.token, register: registerId})
      .unwrap()
      .then(res => {
        setConsultationsData(res);
      })
      .catch(e => console.log(e));
  };

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
          <Titler text={t('patient_history_active')} />
          {consultationsData.map(item => {
            return (
              <Animated.View key={item.id} entering={FadeInUp}>
                <View style={{height: 10}} />
                <ConsultationItem
                  data={item}
                  lang={lang}
                  setModal={setModal}
                  setModalData={setModalData}
                />
              </Animated.View>
            );
          })}
        </View>
      </Animated.ScrollView>
      {isLoading ? (
        <View style={styles.preloader}>
          <LittlePreloader />
        </View>
      ) : null}
      {isModal && (
        <ReviewModal
          isVisible={isModal}
          setVisible={setModal}
          data={modalData}
        />
      )}
    </>
  );
};

export default HistoryConsultScreen;
