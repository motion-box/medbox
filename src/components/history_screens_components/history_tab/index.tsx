import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, TouchableOpacity} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useAppSelector} from '../../../hooks/redux';
import {HistoryScreenTypes} from '../../../navigation/HistoryNavigator';
import {colorPalet} from '../../../resources/style/globalStyle';
import styles from './style';

const HistoryTab = ({navigation, state}: MaterialTopTabBarProps) => {
  const {
    screen: {width},
  } = useAppSelector(state => state.globalReducer);
  const itemWidth = (width - 40) / 3 - 7.5;
  const x = useSharedValue(0);
  const {t} = useTranslation();
  const data = [
    {
      id: 0,
      name: t('consultations'),
      tab: HistoryScreenTypes.historyConsultScreen,
    },
    {id: 1, name: t('analyzes'), tab: HistoryScreenTypes.historyAnalyzesScreen},
    {
      id: 2,
      name: t('prescriptions'),
      tab: HistoryScreenTypes.historyPrescriptionScreen,
    },
  ];

  useEffect(() => {
    console.log(state.index);
    if (state.index === 1) {
      x.value = withTiming(itemWidth + 5);
    } else if (state.index === 2) {
      x.value = withTiming(itemWidth * 2 + 12.5);
    } else {
      x.value = withTiming(0);
    }
  }, [state]);

  const rStyle = useAnimatedStyle(() => ({
    left: x.value,
  }));

  const mapTabs = data.map(item => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => state.index !== item.id && navigation.navigate(item.tab)}
        style={[styles.item]}>
        <Text
          style={[
            styles.text,
            {
              color:
                state.index === item.id
                  ? colorPalet.white100
                  : colorPalet.black100,
            },
          ]}
          adjustsFontSizeToFit={true}
          numberOfLines={1}>
          {item.name}
        </Text>
        <View
          style={{
            borderRadius: 5,
            width: 5,
            height: 5,
            position: 'absolute',
            right: 5,
            top: 5,
            backgroundColor: colorPalet.brandGreen,
          }}
        />
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.background_item, rStyle, {width: itemWidth}]}
      />
      {mapTabs}
    </View>
  );
};

export default HistoryTab;
