import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import styles from './style';
import {useAppSelector} from '../../../hooks/redux';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Search from '../../../components/global_components/search';
import Titler from '../../../components/global_components/titler';
import Animated, {
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

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: {
    params?: {};
  };
}

const doctors = [
  {
    id: '0',
    name: 'Abduhakimova Munavvar',
    speciality: 'Cardiologist',
    price: 300000,
    rate: 4.5,
    imageUrl: '',
  },
  {
    id: '1',
    name: 'Azamat Alimov',
    speciality: 'Cardiologist',
    price: 120000,
    rate: 3.9,
    imageUrl: '',
  },
  {
    id: '2',
    name: 'Ulugbek Alimov',
    speciality: 'Cardiologist',
    price: 299990,
    rate: 5,
    imageUrl: '',
  },
  {
    id: '3',
    name: 'Avaz Shoabdullaev',
    speciality: 'Cardiologist',
    price: 299990,
    rate: 3.2,
    imageUrl: '',
  },
  {
    id: '4',
    name: 'Timur Amiraliev',
    speciality: 'Cardiologist',
    price: 399999,
    rate: 4.2,
    imageUrl: '',
  },
  {
    id: '5',
    name: 'Timur Amiraliev',
    speciality: 'Cardiologist',
    price: 399999,
    rate: 4.2,
    imageUrl: '',
  },
  {
    id: '6',
    name: 'Timur Amiraliev',
    speciality: 'Cardiologist',
    price: 399999,
    rate: 4.2,
    imageUrl: '',
  },
  {
    id: '7',
    name: 'Timur Amiraliev',
    speciality: 'Cardiologist',
    price: 399999,
    rate: 4.2,
    imageUrl: '',
  },
  {
    id: '8',
    name: 'Timur Amiraliev',
    speciality: 'Cardiologist',
    price: 399999,
    rate: 4.2,
    imageUrl: '',
  },
  {
    id: '9',
    name: 'Timur Amiraliev',
    speciality: 'Cardiologist',
    price: 399999,
    rate: 4.2,
    imageUrl: '',
  },
  {
    id: '10',
    name: 'Timur Amiraliev',
    speciality: 'Cardiologist',
    price: 399999,
    rate: 4.2,
    imageUrl: '',
  },
  {
    id: '11',
    name: 'Timur Amiraliev',
    speciality: 'Cardiologist',
    price: 399999,
    rate: 4.2,
    imageUrl: '',
  },
];

const SearchScreen = ({navigation}: ScreenProps) => {
  const {screen} = useAppSelector(state => state.globalReducer);
  const opacity = useSharedValue(0);

  const [setting, setSetting] = useState(false);

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

  const navigateToDoctor = (id: string) => {
    navigation.navigate(NavigatorTypes.doctorStack.doctorScreen, {id: id});
  };

  const mapResult = doctors.map(item => {
    return (
      <DoctorCard
        key={item.id}
        data={item}
        nagigateToDoctor={navigateToDoctor}
      />
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
        shearchFunc={() => console.log('find doctor')}
        options={{placeholder: 'Find doctor', autoFocus: true}}
        filterPress={() => setSetting(true)}
      />
      <View style={{height: 20}} />
      <View style={{zIndex: 1, marginBottom: 5}}>
        <Titler text="Result" subtext={`${doctors.length}`} />
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
      {doctors.length ? (
        // <></>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 20}}
          onScroll={handleScroll}
          scrollEventThrottle={50}
          showsVerticalScrollIndicator={false}>
          {mapResult}
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <EmptyEvent text="No results" icon="SearchIcon" />
        </View>
      )}
      {setting && (
        <SearchSettingsModal isVisible={setting} setVisible={setSetting} />
      )}
    </View>
  );
};
export default SearchScreen;
