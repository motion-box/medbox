import React, {useEffect, useState} from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {colorPalet} from '../../../resources/style/globalStyle';
import QRCode from 'react-native-qrcode-svg';
import styles from './style';
import {paramsSlice} from '../../../store/reducers/ParamsSlice';
import {useTranslation} from 'react-i18next';
import {CloseCircleIcon, NoInternetIcon} from '../../../resources/icons/icons';
import {userAPI} from '../../../services/UserService';
import LittlePreloader from '../little_preloader';
import Animated, {
  FadeIn,
  FadeOut,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const QrModal = () => {
  const {t} = useTranslation();
  const {isQr} = useAppSelector(state => state.paramsReducer);
  const {accessData} = useAppSelector(state => state.userReducer);
  const dispath = useAppDispatch();
  const {setQr} = paramsSlice.actions;
  const [getQrCode, {isLoading}] = userAPI.useGetQrCodeMutation();
  const [qrData, setQrData] = useState('');
  const timerWidth = useSharedValue(0);
  const [noInternet, setNoInternet] = useState(false);

  useEffect(() => {
    if (isQr) {
      getQR();
    } else {
      setQrData('');
      setNoInternet(false);
    }
  }, [isQr]);
  timerWidth.value = 0;
  const getQR = () => {
    getQrCode(accessData!.token)
      .unwrap()
      .then(res => {
        setQrData(res.code);
        timerWidth.value = withTiming(220, {duration: 61000}, isFinished => {
          if (isFinished) {
            runOnJS(getQR)();
          }
        });
      })
      .catch(e => {
        if (e.status === 'FETCH_ERROR') {
          setNoInternet(true);
        }
      });
  };

  const timerStyle = useAnimatedStyle(() => ({
    width: timerWidth.value,
  }));

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isQr}
      style={{
        width: '100%',
        height: '100%',
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: colorPalet.black20,
        }}>
        <View style={[styles.container]}>
          <Text style={styles.title_text}>{t('qr_title')}</Text>
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={styles.qr_cont}>
            {qrData ? (
              <QRCode
                value={qrData}
                size={220}
                backgroundColor="transparent"
                enableLinearGradient={true}
                linearGradient={['#51df9a', '#49d1ec']}
                logoBackgroundColor="#fff"
              />
            ) : (
              <View style={styles.qr_place_holder}>
                {noInternet ? (
                  <NoInternetIcon
                    width="56"
                    height="56"
                    color={colorPalet.black20}
                  />
                ) : null}
              </View>
            )}
          </Animated.View>
          <View style={styles.loader_cont}>
            <AnimatedLinearGradient
              colors={colorPalet.brandGradient}
              useAngle={true}
              angle={90}
              style={[
                timerStyle,
                {
                  height: '100%',
                  backgroundColor: colorPalet.brandGreen,
                  borderRadius: 5,
                },
              ]}
            />
          </View>
          <Text style={styles.subtite_text}>{t('qr_subtitle')}</Text>

          {isLoading ? (
            <Animated.View
              style={styles.preloader}
              entering={FadeIn}
              exiting={FadeOut}>
              <LittlePreloader />
            </Animated.View>
          ) : null}
        </View>
        <TouchableOpacity
          style={styles.button_cont}
          onPress={() => dispath(setQr(false))}>
          <CloseCircleIcon width="32" height="32" color={colorPalet.black100} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default QrModal;
