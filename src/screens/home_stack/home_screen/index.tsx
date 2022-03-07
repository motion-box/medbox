import React from 'react';
import {View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Actions from '../../../components/history_screens_components/actions';
import Header from '../../../components/global_components/header';
import NewsCarousel from '../../../components/home_screens_components/news_carousel';
import Search from '../../../components/global_components/search';
import {colorPalet} from '../../../resources/style/globalStyle';
import {NewsModel} from '../../../models/NewsModel';
import {ActionModel} from '../../../models/ActionsModel';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {globalSlice} from '../../../store/reducers/GlobalSlice';
import {useFocusEffect} from '@react-navigation/native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {NavigatorTypes} from '../../../navigation';
import StatusBarFocus from '../../../components/global_components/StatusBarCustom';

const newsData: Array<NewsModel> = [
  {
    id: '0',
    title: 'Alisa Miller',
    subTitle: 'Alisa Miller',
    description:
      'Urologists diagnose of the urinary tract in both men and women.',
    imageUrl: 'img2.png',
  },
  {
    id: '1',
    title: 'Azamat Alimov',
    subTitle: 'Azamat Alimov',
    description: 'I will help you to develop react-native applications!',
    imageUrl: 'img2.png',
  },
  {
    id: '2',
    title: 'Alimov Ulugbek',
    subTitle: 'Alimov Ulugbek',
    description: 'I can create any design you want for a lot of tons of money.',
    imageUrl: 'img2.png',
  },
];
const actionsData: Array<ActionModel> = [
  {
    id: '0',
    title: 12102,
    status: 'active',
    created: {
      date: '2022-12-12',
      doctor: 'Abduhakimova Munavvar',
      speciality: 'Cardiologist',
      imageUrl: 'image',
    },
  },
  {
    id: '1',
    title: 12105,
    status: 'canceled',
    created: {
      date: '2022-12-12',
      doctor: 'Abduhakimova Munavvar',
      speciality: 'Cardiologist',
      imageUrl: 'image',
    },
    finished: {
      date: '2022-12-12',
      doctor: 'Abduhakimova Munavvar',
      speciality: 'Cardiologist',
      imageUrl: 'image',
    },
  },
  {
    id: '2',
    title: 19021,
    status: 'closed',
    created: {
      date: '2022-12-12',
      doctor: 'Abduhakimova Munavvar',
      speciality: 'Cardiologist',
      imageUrl: 'image',
    },
    finished: {
      date: '2022-12-12',
      doctor: 'Abduhakimova Munavvar',
      speciality: 'Cardiologist',
      imageUrl: 'image',
    },
  },
  {
    id: '3',
    title: 20150,
    status: 'active',
    created: {
      date: '2022-12-12',
      doctor: 'Abduhakimova Munavvar',
      speciality: 'Cardiologist',
      imageUrl: 'image',
    },
  },
];

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: {
    params?: {};
  };
}

const HomeScreen = ({navigation}: ScreenProps) => {
  const {t} = useTranslation();
  const {os, screen} = useAppSelector(state => state.globalReducer);
  const dispatch = useAppDispatch();
  const {setBottomTabVisible} = globalSlice.actions;
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollY.value = e.contentOffset.y;
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      dispatch(setBottomTabVisible(true));
    }, []),
  );
  const goSearch = () => {
    navigation.navigate(NavigatorTypes.homeStack.searchScreen);
  };

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
            title: 'Smariddin Salohiddinov',
            subtitle: t('welcome_to_medbox'),
            smallAlign: 'center',
            left: {
              backgroundColor: 'white100',
              image: ' ',
              onPress: () => console.log('left'),
            },
            right: {
              backgroundColor: 'white100',
              icon: 'QRIcon',
              isGradient: true,
              onPress: () => console.log('right'),
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
          <Search
            shearchFunc={goSearch}
            options={{placeholder: t('search_doctor')}}
            filterPress={goSearch}
          />
          <NewsCarousel data={newsData} />
          <Actions titleText={t('actions_last')} data={actionsData} />
        </Animated.ScrollView>
      </View>
    </View>
  );
};
export default HomeScreen;
