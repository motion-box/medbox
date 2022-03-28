import React, {useEffect} from 'react';
import {View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Actions from '../../../components/history_screens_components/actions';
import Header from '../../../components/global_components/header';
import NewsCarousel from '../../../components/home_screens_components/news_carousel';
import {colorPalet} from '../../../resources/style/globalStyle';
import {NewsModel} from '../../../models/NewsModel';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import StatusBarFocus from '../../../components/global_components/StatusBarCustom';
import FakeSearch from '../../../components/home_screens_components/fake_search';
import {classifiersAPI} from '../../../services/ClassifiersService';
import {classifiersSlice} from '../../../store/reducers/ClassifiersSlice';
import {paramsSlice} from '../../../store/reducers/ParamsSlice';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: {
    params?: {};
  };
}

const HomeScreen = ({navigation}: ScreenProps) => {
  const {t} = useTranslation();
  const scrollY = useSharedValue(0);
  const {os, screen} = useAppSelector(state => state.globalReducer);
  const {userRegisters, userData, accessData} = useAppSelector(
    state => state.userReducer,
  );
  const [getHourIntevals] = classifiersAPI.useGetHourIntervalsMutation();
  const {setHourIntervals} = classifiersSlice.actions;
  const {setQr} = paramsSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    getHourIntevals({token: accessData!.token})
      .unwrap()
      .then(res => {
        dispatch(setHourIntervals(res));
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

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
            title: `${userData?.first_name} ${userData?.last_name}`,
            subtitle: t('welcome_to_medbox'),
            smallAlign: 'center',
            left: {
              backgroundColor: 'white100',
              image: userData?.photo,
              onPress: () => navigation.navigate('AccountScreen'),
            },
            right: {
              backgroundColor: 'white100',
              icon: 'QRIcon',
              isGradient: true,
              onPress: () => dispatch(setQr(true)),
            },
          }}
        />
        <Animated.ScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingTop: 50,
            paddingBottom: screen.hasNotch
              ? 154
              : 120 + (screen.headerSize || 20),
          }}
          style={{zIndex: -1, flex: 1, top: 40}}
          showsVerticalScrollIndicator={false}>
          <FakeSearch />
          <NewsCarousel />
          <View style={{height: 20}} />
          <Actions titleText={t('actions_last')} data={userRegisters.last} />
        </Animated.ScrollView>
      </View>
    </View>
  );
};
export default HomeScreen;
