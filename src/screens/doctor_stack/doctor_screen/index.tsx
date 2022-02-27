import React, {useState} from 'react';
import {Text, View} from 'react-native';
import styles from './style';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Header from '../../../components/global_components/header';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {colorPalet} from '../../../resources/style/globalStyle';
import {useAppSelector} from '../../../hooks/redux';
import DoctorCard from '../../../components/doctor_screens_components/doctor_card';
import DoctorReview from '../../../components/doctor_screens_components/doctor_review';
import {useTranslation} from 'react-i18next';
import StatusBarFocus from '../../../components/global_components/StatusBarCustom';
import Button from '../../../components/global_components/button';
import DoctorBookModal from '../../../components/doctor_screens_components/doctor_book_modal';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: {
    params: {
      id: string;
    };
  };
}

const DoctorScreen = ({navigation, route}: ScreenProps) => {
  const {t} = useTranslation();
  const {screen, os} = useAppSelector(state => state.globalReducer);
  const scrollY = useSharedValue(0);
  const [isModal, setModal] = useState(false);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollY.value = e.contentOffset.y;
    },
  });
  return (
    <View
      style={{
        backgroundColor: colorPalet.bgColor,
        flex: 1,
      }}>
      <View
        style={{
          backgroundColor: colorPalet.bgColor,
          flex: 1,
          marginTop: screen.hasNotch ? 44 : screen.headerSize || 20,
        }}>
        <StatusBarFocus
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <Header
          scrollY={scrollY}
          options={{
            title: t('doctor_screen_title'),
            bigAlign: 'center',
            smallAlign: 'center',
            left: {
              backgroundColor: 'white100',
              icon: 'ArrowIcon',
              iconRotate: '90',
              onPress: () => navigation.pop(),
            },
            right: {
              backgroundColor: 'bgColor',
              onPress: () => null,
            },
          }}
        />
        <Animated.ScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingTop: 40,
            paddingBottom: screen.hasNotch
              ? 154
              : 120 + (screen.headerSize || 20),
          }}
          style={{zIndex: -1, flex: 1, top: 40}}
          showsVerticalScrollIndicator={false}>
          <DoctorCard />
          <DoctorReview />
        </Animated.ScrollView>
      </View>
      <View
        style={[styles.bottom_cont, {marginBottom: screen.hasNotch ? 44 : 20}]}>
        <Button
          text={t('doctor_book')}
          onPress={() => setModal(true)}
          options={{
            borderRadius: 10,
            buttonWidth: '100%',
            buttonHeight: 50,
            textSize: 14,
          }}
        />
      </View>

      {isModal && <DoctorBookModal isVisible={isModal} setVisible={setModal} />}
    </View>
  );
};

export default DoctorScreen;
