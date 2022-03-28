import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import Header from '../../../components/global_components/header';
import CardTitler from '../../../components/global_components/card_titler';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import StatusBarFocus from '../../../components/global_components/StatusBarCustom';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {useAppSelector} from '../../../hooks/redux';
import {useTranslation} from 'react-i18next';
import {colorPalet} from '../../../resources/style/globalStyle';
import {ClinicModel, DoctorModel} from '../../../models/DoctorModel';
import {SpecialityModel} from '../../../models/ClassifiersModel';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NavigatorTypes} from '../../../navigation';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: {
    params:
      | {
          title: string;
          type: 'doctor';
          data: DoctorModel<SpecialityModel>[];
          creatingData: {
            registerId: number;
            specialityId: number;
            consultationId: number;
            popNumber: number;
          };
        }
      | {
          title: string;
          type: 'clinic';
          data: ClinicModel[];
          creatingData: {
            registerId: number;
            specialityId: number;
            consultationId: number;
            popNumber: number;
          };
        };
  };
}

const ShowMoreScreen = ({navigation, route}: ScreenProps) => {
  const {title, data, type, creatingData} = route.params;
  const {screen, lang} = useAppSelector(state => state.globalReducer);
  const scrollY = useSharedValue(0);
  const {t} = useTranslation();
  const [doctorsArr, setDoctorsArr] = useState<DoctorModel<SpecialityModel>[]>(
    [],
  );
  const [clinicArr, setClinicArr] = useState<ClinicModel[]>([]);

  useEffect(() => {
    if (type === 'doctor') {
      setDoctorsArr(data);
    } else {
      setClinicArr(data);
    }
  }, []);

  const mapItems = doctorsArr.map(item => (
    <TouchableOpacity
      key={item.id}
      style={styles.item_cont}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate(NavigatorTypes.doctorStack.doctorScreen, {
          id: item.id,
          read_only: false,
          creatingData: creatingData,
          popNumber: 2,
        })
      }>
      <CardTitler
        imageUrl={item.photo}
        name={`${item.first_name} ${item.last_name}`}
        stars={item.rating as 1}
        clipper="white"
        right={{
          boldSecond: {
            title: item.speciality[`name_${lang}`],
            subtitle: `≈${item.average_price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} uzs`,
          },
        }}
      />
    </TouchableOpacity>
  ));

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
            title: title,
            bigAlign: 'center',
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
              ? 154
              : 120 + (screen.headerSize || 20),
          }}
          style={{zIndex: -1, flex: 1, top: 40}}
          showsVerticalScrollIndicator={false}>
          {mapItems}
        </Animated.ScrollView>
      </View>
    </View>
  );
};

export default ShowMoreScreen;
