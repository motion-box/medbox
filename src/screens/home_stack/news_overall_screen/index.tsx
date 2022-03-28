import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
// import styles from './style';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import Animated, {
  FadeInDown,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {useAppSelector} from '../../../hooks/redux';
import {colorPalet} from '../../../resources/style/globalStyle';
import StatusBarFocus from '../../../components/global_components/StatusBarCustom';
import Header from '../../../components/global_components/header';
import NewsCard from '../../../components/home_screens_components/news_card';
import {NewsModel} from '../../../models/NewsModel';
import {classifiersAPI} from '../../../services/ClassifiersService';
import {NavigatorTypes} from '../../../navigation';
import LittlePreloader from '../../../components/global_components/little_preloader';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: {
    params?: {};
  };
}
const NewsOverallScreen = ({navigation, route}: ScreenProps) => {
  const {t} = useTranslation();
  const scrollY = useSharedValue(0);
  const {os, screen} = useAppSelector(state => state.globalReducer);
  const {accessData} = useAppSelector(state => state.userReducer);
  const [getNews, {isLoading}] = classifiersAPI.useGetNewsMutation();
  const [data, setData] = useState<NewsModel[]>([]);

  useEffect(() => {
    getNews({token: accessData!.token})
      .unwrap()
      .then(res => {
        if (res.length) {
          setData(res);
        }
      })
      .catch(e => console.log(e));
  }, []);

  const onCardPress = (item: NewsModel) => {
    navigation.navigate(NavigatorTypes.homeStack.newsScreen, {
      data: item,
    });
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
            title: t('news_last'),
            smallAlign: 'center',
            left: {
              backgroundColor: 'white100',
              icon: 'ArrowIcon',
              iconRotate: '90',
              onPress: () => navigation.goBack(),
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
            paddingTop: 50,
            paddingBottom: screen.hasNotch
              ? 73
              : 20 + (screen.headerSize || 20),
          }}
          style={{zIndex: -1, flex: 1, top: 40}}
          showsVerticalScrollIndicator={false}>
          <>
            {data.map((item, index) => (
              <Animated.View
                key={item.id}
                entering={FadeInDown.delay(100 + 100 * index)}
                style={{
                  alignItems: 'center',
                  marginVertical: 5,
                }}>
                <NewsCard data={item} onPress={onCardPress} />
              </Animated.View>
            ))}
          </>
        </Animated.ScrollView>
      </View>
      {isLoading ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colorPalet.white50,
          }}>
          <LittlePreloader />
        </View>
      ) : null}
    </View>
  );
};

export default NewsOverallScreen;
