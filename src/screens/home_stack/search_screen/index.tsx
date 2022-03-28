import React, {useEffect, useRef, useState} from 'react';
import {View, ScrollView, Text, ActivityIndicator} from 'react-native';
import styles from './style';
import {useAppSelector} from '../../../hooks/redux';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Search from '../../../components/global_components/search';
import Titler from '../../../components/global_components/titler';
import Animated, {
  FadeInDown,
  FadeOutDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import DoctorCard from '../../../components/home_screens_components/doctor_card';
import EmptyEvent from '../../../components/global_components/empty_event';
import SearchSettingsModal from '../../../components/global_components/bottom_sheet_modal/search_setting_modal';
import StatusBarFocus from '../../../components/global_components/StatusBarCustom';
import {NavigatorTypes} from '../../../navigation';
import {doctorAPI, SearchParams} from '../../../services/DoctorService';
import {DoctorModel} from '../../../models/DoctorModel';
import {SpecialityModel} from '../../../models/ClassifiersModel';
import {useTranslation} from 'react-i18next';
import LittlePreloader from '../../../components/global_components/little_preloader';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: {
    params: {
      isModal: boolean;
      isFocus: boolean;
      filterSpeciality: {id: number; index: number; name: string} | undefined;
    };
  };
}

const SearchScreen = ({navigation, route}: ScreenProps) => {
  const {t} = useTranslation();
  const {filterSpeciality, isFocus, isModal} = route.params;
  const {screen, lang} = useAppSelector(state => state.globalReducer);
  const {accessData} = useAppSelector(state => state.userReducer);
  const opacity = useSharedValue(0);
  const [setting, setSetting] = useState(isModal);
  const selectedOnlineOption = useRef(0);
  const selectedRatingOption = useRef(0);
  const [filterParams, setFilterParams] = useState<SearchParams>({
    speciality: filterSpeciality?.id,
    rating__gte: 0,
    rating__lte: undefined,
    is_online: undefined,
  });
  const [searchingText, setSearchingText] = useState('');
  const [searchResult, setSearchResult] = useState<
    Array<DoctorModel<SpecialityModel>>
  >([]);
  const [searchDoctor, {isLoading}] = doctorAPI.useSearchDoctorMutation();

  useEffect(() => {
    startSearching();
  }, [searchingText, filterParams]);

  const startSearching = () => {
    searchDoctor({
      token: accessData!.token,
      params: {...filterParams, search: searchingText},
    })
      .unwrap()
      .then(res => {
        if (res) {
          setSearchResult(res);
        }
      })
      .catch(e => console.log(e));
  };

  const changeFilterParams = (data: SearchParams) => {
    setFilterParams({...data});
  };

  const handleScroll = (event: any) => {
    if (event.nativeEvent.contentOffset.y > 5) {
      !opacity.value && (opacity.value = withTiming(1));
    } else {
      opacity.value && (opacity.value = withTiming(0));
    }
  };

  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const navigateToDoctor = (id: number) => {
    navigation.navigate(NavigatorTypes.doctorStack.doctorScreen, {id: id});
  };

  const mapResult = searchResult.map(item => {
    return (
      <Animated.View key={item.id} entering={FadeInDown} exiting={FadeOutDown}>
        <DoctorCard
          lang={lang}
          data={item}
          nagigateToDoctor={navigateToDoctor}
        />
      </Animated.View>
    );
  });

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: screen.hasNotch ? 64 : (screen.headerSize || 20) + 20,
        },
      ]}>
      <StatusBarFocus
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Search
        filterParams={filterParams}
        setFilterParams={changeFilterParams}
        searchingText={searchingText}
        setSearchingText={setSearchingText}
        options={{
          placeholder: 'Find doctor',
          autoFocus: isFocus,
          selected: filterSpeciality,
        }}
        settingsPressed={() => setSetting(true)}
      />
      <View style={{height: 20}} />
      <View style={{zIndex: 1, marginBottom: 5}}>
        <Titler text={t('result')} subtext={`${searchResult.length}`} />
        <Animated.View
          pointerEvents="none"
          style={[
            rStyle,
            {
              width: '100%',
              height: 30,
              backgroundColor: 'transparent',
              top: 35,
              zIndex: 1,
              position: 'absolute',
            },
          ]}>
          <LinearGradient
            colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0)']}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent',
            }}
          />
        </Animated.View>
      </View>
      <>
        {isLoading ? (
          <Animated.View style={styles.preloader}>
            <LittlePreloader />
          </Animated.View>
        ) : searchResult.length ? (
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 20}}
            onScroll={handleScroll}
            scrollEventThrottle={50}
            showsVerticalScrollIndicator={false}>
            {mapResult}
          </ScrollView>
        ) : (
          <View style={styles.preloader}>
            <EmptyEvent text={t('no_results')} icon="SearchIcon" />
          </View>
        )}
      </>
      {setting && (
        <SearchSettingsModal
          selectedOnlineOption={selectedOnlineOption}
          selectedRatingOption={selectedRatingOption}
          isVisible={setting}
          setVisible={setSetting}
          filterParams={filterParams}
          setFilterParams={changeFilterParams}
        />
      )}
    </View>
  );
};
export default SearchScreen;
