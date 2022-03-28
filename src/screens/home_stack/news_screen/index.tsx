import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import styles from './style';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {useAppSelector} from '../../../hooks/redux';
import {colorPalet} from '../../../resources/style/globalStyle';
import StatusBarFocus from '../../../components/global_components/StatusBarCustom';
import Header from '../../../components/global_components/header';
import {NewsModel} from '../../../models/NewsModel';
import RenderHtml, {MixedStyleDeclaration} from 'react-native-render-html';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: {
    params: {
      data: NewsModel;
    };
  };
}

const tagsStyles: Readonly<Record<string, MixedStyleDeclaration>> = {
  body: {
    whiteSpace: 'normal',
    color: 'gray',
  },
  a: {
    color: 'green',
  },
  h1: {
    fontSize: 24,
    color: colorPalet.black100,
  },
  h2: {
    fontSize: 18,
    color: colorPalet.black100,
  },
  h3: {
    fontSize: 16,
    color: colorPalet.black100,
  },
  p: {
    fontSize: 14,
    color: colorPalet.black50,
  },
  img: {
    borderRadius: 10,
    overflow: 'hidden',
  },
};

const NewsScreen = ({navigation, route}: ScreenProps) => {
  const {t} = useTranslation();
  const {data} = route.params;
  const scrollY = useSharedValue(0);
  const {os, screen, lang} = useAppSelector(state => state.globalReducer);

  console.log(data);

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
            title: data[`title_${lang}`],
            subtitle: data[`subtitle_${lang}`],
            smallAlign: 'left',
            left: {
              backgroundColor: 'white100',
              icon: 'ArrowIcon',
              iconRotate: '90',
              onPress: () => navigation.goBack(),
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
          <View style={styles.container}>
            <Image
              source={{uri: data.portrait}}
              style={[styles.image, {height: (screen.width - 40) / 0.88}]}
            />
            <RenderHtml
              contentWidth={screen.width - 40}
              source={{html: data[`body_${lang}`]}}
              tagsStyles={tagsStyles}
            />
          </View>
        </Animated.ScrollView>
      </View>
    </View>
  );
};

export default NewsScreen;
