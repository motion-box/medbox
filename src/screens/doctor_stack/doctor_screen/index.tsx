import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import styles from './style';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Header from '../../../components/global_components/header';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {colorPalet} from '../../../resources/style/globalStyle';
import {useAppSelector} from '../../../hooks/redux';
import DoctorCard from '../../../components/doctor_screens_components/doctor_card';
import DoctorReview from '../../../components/doctor_screens_components/doctor_review';
import {useTranslation} from 'react-i18next';
import StatusBarFocus from '../../../components/global_components/StatusBarCustom';
import Button from '../../../components/global_components/button';
import DoctorBookModal from '../../../components/doctor_screens_components/doctor_book_modal';
import {useDispatch} from 'react-redux';
import {paramsSlice} from '../../../store/reducers/ParamsSlice';
import {doctorAPI} from '../../../services/DoctorService';
import {
  DoctorModel,
  EstimateModel,
  PriceOfSpecialityModel,
} from '../../../models/DoctorModel';
import {SpecialityModel} from '../../../models/ClassifiersModel';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: {
    params: {
      id: number;
      read_only: boolean;
      creatingData?: {
        registerId: number;
        specialityId: number;
        consultationId: number;
      };
      popNumber: number;
    };
  };
}

const DoctorScreen = ({navigation, route}: ScreenProps) => {
  const {t} = useTranslation();
  const {id: doctorId, read_only, creatingData, popNumber} = route.params;
  const dispatch = useDispatch();
  const {setLoading} = paramsSlice.actions;
  const {screen} = useAppSelector(state => state.globalReducer);
  const {accessData} = useAppSelector(state => state.userReducer);
  const scrollY = useSharedValue(0);
  const [isModal, setModal] = useState(false);
  const [doctorData, setDoctorData] = useState<DoctorModel<SpecialityModel>>();
  const [workPlaceData, setWorkPlaceData] =
    useState<Array<PriceOfSpecialityModel>>();
  const [reviewsData, setReviewsData] = useState<Array<EstimateModel>>([]);
  const [specialityId, setSpecialityId] = useState<number>();

  // api calls
  const [getDoctor] = doctorAPI.useGetDoctorByIdMutation();
  const [getWorkplace] = doctorAPI.useGetDoctorWorkPlacesMutation();
  const [getEstimates] = doctorAPI.useGetEstimatesMutation();

  useEffect(() => {
    dispatch(setLoading(true));
    getDoctor({id: doctorId, token: accessData!.token})
      .unwrap()
      .then(doctorRes => {
        if (doctorRes.id) {
          console.log(doctorRes);
          setSpecialityId(doctorRes.speciality.id);
          setDoctorData(doctorRes);
          getWorkplace({id: doctorId, token: accessData!.token})
            .unwrap()
            .then(workplaceRes => {
              setWorkPlaceData(workplaceRes);
              getEstimates({token: accessData!.token, doctor: doctorId})
                .unwrap()
                .then(estimatesRes => {
                  setReviewsData(estimatesRes);
                  dispatch(setLoading(false));
                })
                .catch(e => {
                  console.log(e);
                });
            })
            .catch(e => {
              console.log(e);
            });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

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
            title: t('doctor_screen_title'),
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
          <DoctorCard doctorData={doctorData} workPlaceData={workPlaceData} />
          <DoctorReview data={reviewsData} />
        </Animated.ScrollView>
      </View>
      {!read_only ? (
        <View
          style={[
            styles.bottom_cont,
            {marginBottom: screen.hasNotch ? 44 : 20},
          ]}>
          <Button
            text={t('doctor_book')}
            onPress={() => setModal(true)}
            options={{
              borderRadius: 10,
              buttonWidth: '100%',
              buttonHeight: 50,
              textSize: 14,
            }}
          />
        </View>
      ) : null}

      {isModal && (
        <DoctorBookModal
          isVisible={isModal}
          setVisible={setModal}
          workPlaceData={workPlaceData}
          doctorId={doctorId}
          specialityId={specialityId}
          token={accessData!.token}
          userId={accessData!.id}
          creatingData={creatingData}
          popNumber={popNumber}
        />
      )}
    </View>
  );
};

export default DoctorScreen;
