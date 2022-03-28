import React, {useState} from 'react';
import {View, KeyboardAvoidingView} from 'react-native';
import Actions from '../../../components/history_screens_components/actions';
import Header from '../../../components/global_components/header';
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
import ActionsHistory from '../../../components/history_screens_components/actions_history';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NavigatorTypes} from '../../../navigation';
import {useFocusEffect} from '@react-navigation/native';
import LittlePreloader from '../../../components/global_components/little_preloader';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: {
    params: {};
  };
}

const HistoryScreen = ({navigation}: ScreenProps) => {
  const {t} = useTranslation();
  const {screen, os} = useAppSelector(state => state.globalReducer);
  const scrollY = useSharedValue(0);
  const [searchText, setSearchText] = useState('');
  const [isFocuse, setFocuse] = useState(false);
  const {userRegisters} = useAppSelector(state => state.userReducer);
  const [screenFocuse, setScreenFocuse] = useState(false);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollY.value = e.contentOffset.y;
    },
  });

  useFocusEffect(() => {
    setScreenFocuse(true);
  });

  const onCreatePress = () => {
    navigation.navigate(NavigatorTypes.homeStack.searchScreen, {
      filterSpeciality: undefined,
      isModal: undefined,
      isFocus: undefined,
    });
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
              onPress: onCreatePress,
            },
          }}
        />
        <KeyboardAvoidingView
          behavior={os === 'ios' ? 'padding' : undefined}
          style={{flex: 1}}>
          {screenFocuse ? (
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
                    data={userRegisters.active}
                  />
                  <ActionsHistory data={userRegisters.history} />
                </Animated.View>
              )}
              {isFocuse && (
                <Animated.View entering={FadeInDown}>
                  <ActionsSearch text={searchText} />
                </Animated.View>
              )}
            </Animated.ScrollView>
          ) : (
            <View style={{flex: 1}}>
              <LittlePreloader />
            </View>
          )}
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default HistoryScreen;
