import React, {useState} from 'react';
import {View, KeyboardAvoidingView} from 'react-native';
import Actions from '../../../components/history_screens_components/actions';
import ActionsHistory from '../../../components/history_screens_components/actions_history';
import Header from '../../../components/global_components/header';
import {ActionModel, ActionHistoryModel} from '../../../models/ActionsModel';
import {colorPalet} from '../../../resources/style/globalStyle';
import Animated, {
  FadeInDown,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {useAppSelector} from '../../../hooks/redux';
import StatusBarFocus from '../../../components/global_components/StatusBarCustom';
import {useTranslation} from 'react-i18next';
import SearchAnimated from '../../../components/global_components/search_animated';
import ActionsSearch from '../../../components/history_screens_components/actions_search';

const actionsData: Array<ActionModel> = [
  {
    id: '0',
    title: 12120,
    status: 'active',
    created: {
      date: '2022-12-12',
      doctor: 'Abduhakimova Munavvar',
      speciality: 'Cardiologist',
      imageUrl: 'image',
    },
    warn: {
      text: 'payment_required',
    },
  },
  {
    id: '1',
    title: 15000,
    status: 'active',
    created: {
      date: '2022-12-12',
      doctor: 'Abduhakimova Munavvar',
      speciality: 'Cardiologist',
      imageUrl: 'image',
    },
    warn: {
      text: 'payment_required',
    },
  },
  {
    id: '2',
    title: 19821,
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
    title: 24200,
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
      title: 29120,
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
      title: 25480,
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
      title: 54021,
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
      title: 55455,
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

const HistoryScreen = () => {
  const {t} = useTranslation();
  const {screen, os} = useAppSelector(state => state.globalReducer);
  const scrollY = useSharedValue(0);
  const [searchText, setSearchText] = useState('');
  const [isFocuse, setFocuse] = useState(false);

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
          externalCompnent={
            <SearchAnimated
              scrollY={scrollY}
              text={searchText}
              setText={setSearchText}
              isFocuse={isFocuse}
              setFocuse={setFocuse}
              placeholder={t('patient_history_search')}
              options={{paddingHorizontal: 20}}
            />
          }
          options={{
            title: t('patient_history_title'),
            right: {
              backgroundColor: 'white100',
              icon: 'DraftIcon',
              isGradient: true,
              onPress: () => console.log('right'),
            },
          }}
        />
        <KeyboardAvoidingView
          behavior={os === 'ios' ? 'padding' : undefined}
          style={{flex: 1}}>
          <Animated.ScrollView
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            contentContainerStyle={{
              paddingTop: 100,
              paddingBottom: screen.hasNotch
                ? 154
                : 120 + (screen.headerSize || 20),
            }}
            style={{zIndex: -1, flex: 1, top: 40}}
            showsVerticalScrollIndicator={false}>
            {!isFocuse && (
              <Animated.View entering={FadeInDown}>
                <Actions
                  titleText={t('patient_history_active')}
                  data={actionsData}
                />
                <ActionsHistory data={historyData} />
              </Animated.View>
            )}
            {isFocuse && (
              <Animated.View entering={FadeInDown}>
                <ActionsSearch text={searchText} />
              </Animated.View>
            )}
          </Animated.ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default HistoryScreen;
