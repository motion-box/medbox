import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {colorPalet} from '../../../resources/style/globalStyle';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Button from '../../../components/global_components/button';
import Header from '../../../components/global_components/header';
import MessageModal from '../../../components/global_components/modal/message_modal';
import StatusBarFocus from '../../../components/global_components/StatusBarCustom';
import PaymentCard from '../../../components/history_screens_components/payment_card';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import styles from './style';
import LottieView from 'lottie-react-native';
import {registerAPI} from '../../../services/RegisterService';
import {userAPI} from '../../../services/UserService';
import {sortRegister} from '../../../hooks/registerSorter';
import {userSlice} from '../../../store/reducers/UserSlice';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: {
    params: {
      consultationData?: {
        registerId: number;
        specialityId: number;
        conclusionId: number;
        price: number;
      };
    };
  };
}

const cardsData = [
  {
    id: 0,
    cardNumber: '8600 *** *** 4785',
    date: '12/25',
  },
  {
    id: 1,
    cardNumber: '8600 *** *** 5382',
    date: '09/26',
  },
  {
    id: 2,
    cardNumber: '8600 *** *** 7519',
    date: '20/24',
  },
];

const PaymentScreen = ({navigation, route}: ScreenProps) => {
  const {consultationData} = route.params;
  const {t} = useTranslation();
  const scrollY = useSharedValue(0);
  const {accessData} = useAppSelector(state => state.userReducer);
  const {screen} = useAppSelector(state => state.globalReducer);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isWarn, setWarn] = useState(false);
  const [isPaying, setPaying] = useState(false);
  const dispatch = useAppDispatch();
  const {setUserRegisters} = userSlice.actions;
  const [updateConsultation] = registerAPI.useUpdateConsultationMutation();
  const [getUserRegisters] = userAPI.useGetUserRegistersMutation();

  useEffect(() => {
    if (isPaying) {
      updateConsult();
    }
  }, [isPaying]);

  const updateConsult = () => {
    updateConsultation({
      token: accessData!.token,
      id: consultationData?.conclusionId,
      data: {
        register: consultationData?.registerId,
        speciality: consultationData?.specialityId,
        is_payment_required: false,
      },
    })
      .unwrap()
      .then(consultation => {
        getUserRegisters({
          userId: accessData!.id,
          token: accessData!.token,
        })
          .unwrap()
          .then(registers => {
            const sorted = sortRegister(registers);
            dispatch(setUserRegisters({...sorted}));
            setTimeout(() => {
              navigation.goBack();
            }, 2600);
          })
          .catch(e => {
            console.log('Register error: ', e);
          });
      })
      .catch(e => console.log(e));
  };

  const onCardPress = (index: number) => {
    setActiveIndex(index);
  };

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
            title: t('pay_screen_title'),
            bigAlign: 'center',
            smallAlign: 'center',
            left: {
              backgroundColor: 'white100',
              icon: 'ArrowIcon',
              iconRotate: '90',
              onPress: () => navigation.goBack(),
            },
            right: {
              backgroundColor: 'white100',
              icon: 'PlusIcon',
              isGradient: true,
              onPress: () => setWarn(true),
            },
          }}
        />
        <Animated.ScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingTop: 50,
            paddingHorizontal: 20,
            paddingBottom: screen.hasNotch
              ? 154
              : 120 + (screen.headerSize || 20),
          }}
          style={{zIndex: -1, flex: 1, top: 40}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.price_cont}>
            <Text style={styles.price_title}>{t('total_amount')}:</Text>
            <Text style={styles.price_amount}>
              {consultationData?.price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
              uzs
            </Text>
          </View>
          {cardsData.map(item => (
            <PaymentCard
              key={item.id}
              {...item}
              isActive={activeIndex === item.id}
              setActive={onCardPress}
            />
          ))}
        </Animated.ScrollView>
        <View
          style={[
            styles.bottom_cont,
            {
              marginBottom: screen.hasNotch ? 43 : 20,
            },
          ]}>
          <Button
            text={t('pay')}
            onPress={() => setPaying(true)}
            options={{
              buttonWidth: '100%',
              buttonHeight: 50,
              textSize: 14,
              borderRadius: 10,
            }}
          />
        </View>

        <MessageModal
          isVisible={isWarn}
          title={t('engineering_works')}
          description={t('add_card_warn')}
          closeBtn={{
            onPress: () => setWarn(false),
          }}
          btn={{
            text: 'Ok',
            onPress: () => setWarn(false),
          }}
        />
      </View>
      {isPaying ? (
        <View style={styles.loader}>
          <LottieView
            source={require('../../../resources/lottie/Payment.json')}
            loop={false}
            autoPlay
            speed={0.7}
            style={{
              transform: [{scale: 1}],
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

export default PaymentScreen;
