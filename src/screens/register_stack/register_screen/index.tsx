import React, {useState} from 'react';
import {View, ScrollView, Platform} from 'react-native';
import Actions from '../../../components/register_screens_components/actions';
import ActionsHistory from '../../../components/register_screens_components/actions_history';
import Header from '../../../components/global_components/header';
import Search from '../../../components/global_components/search';
import {ActionModel, ActionHistoryModel} from '../../../models/ActionsModel';
import {colorPalet} from '../../../resources/style/globalStyle';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {globalSlice} from '../../../store/reducers/GlobalSlice';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {useFocusEffect} from '@react-navigation/native';
import StatusBarFocus from '../../../components/global_components/StatusBarCustom';

const actionsData: Array<ActionModel> = [
  {
    id: '0',
    title: '55 455',
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
    title: '55 455',
    status: 'active',
    created: {
      date: '2022-12-12',
      doctor: 'Abduhakimova Munavvar',
      speciality: 'Cardiologist',
      imageUrl: 'image',
    },
  },
  {
    id: '2',
    title: '55 455',
    status: 'active',
    created: {
      date: '2022-12-12',
      doctor: 'Abduhakimova Munavvar',
      speciality: 'Cardiologist',
      imageUrl: 'image',
    },
  },
  {
    id: '3',
    title: '55 455',
    status: 'active',
    created: {
      date: '2022-12-12',
      doctor: 'Abduhakimova Munavvar',
      speciality: 'Cardiologist',
      imageUrl: 'image',
    },
  },
];
const historyData: ActionHistoryModel = {
  '01/2022': [
    {
      id: '2',
      title: '55 455',
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
      title: '55 455',
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
  ],
  '12/2021': [
    {
      id: '0',
      title: '55 455',
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
      id: '1',
      title: '55 455',
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
  ],
};

export default function RegisterScreen() {
  const dispatch = useAppDispatch();
  const {setBottomTabVisible} = globalSlice.actions;
  const {screen} = useAppSelector(state => state.globalReducer);
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
            right: {
              backgroundColor: 'white100',
              icon: 'DraftIcon',
              isGradient: true,
              onPress: () => console.log('right'),
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
          <Search
            shearchFunc={e => console.log('DATA: ' + e)}
            options={{placeholder: 'Search register number'}}
            filterPress={() => null}
          />
          <Actions titleText="Active" data={actionsData} />
          <ActionsHistory data={historyData} />
        </Animated.ScrollView>
      </View>
    </View>
  );
}
