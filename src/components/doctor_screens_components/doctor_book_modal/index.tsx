import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import styles from './style';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import moment from 'moment-timezone';
import {useTranslation} from 'react-i18next';
import {colorPalet} from '../../../resources/style/globalStyle';
import LinearGradient from 'react-native-linear-gradient';
import BottomSheetModal from '../../global_components/bottom_sheet_modal';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {
  PriceOfSpecialityModel,
  ScheduleModel,
} from '../../../models/DoctorModel';
import {CloseCircleIcon} from '../../../resources/icons/icons';
import Button from '../../global_components/button';
import Slider from '../../global_components/slider';
import DoctorOrganizationPicker from '../doctor_organization_picker';
import DoctorTimePicker from '../doctor_time_picker';
import {doctorAPI} from '../../../services/DoctorService';
import {registerAPI} from '../../../services/RegisterService';
import {userAPI} from '../../../services/UserService';
import {sortRegister} from '../../../hooks/registerSorter';
import {userSlice} from '../../../store/reducers/UserSlice';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {NavigatorTypes} from '../../../navigation';
import LittlePreloader from '../../global_components/little_preloader';
import {paramsSlice} from '../../../store/reducers/ParamsSlice';

interface Iprops {
  isVisible: boolean;
  setVisible: (state: boolean) => void;
  workPlaceData: Array<PriceOfSpecialityModel> | undefined;
  doctorId: number;
  specialityId?: number;
  token: string;
  userId: number;
  creatingData?: {
    registerId: number;
    specialityId: number;
    consultationId: number;
  };
  popNumber: number;
}

const weeks_name = [
  'sunday_hour_intervals',
  'monday_hour_intervals',
  'tuesday_hour_intervals',
  'wednesday_hour_intervals',
  'thursday_hour_intervals',
  'friday_hour_intervals',
  'saturday_hour_intervals',
];

type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never;
export type DayType = {
  id: number;
  dayKey: ElementType<typeof weeks_name>;
  date: string;
};
export type TimeType = {
  id: number;
  time: string;
};

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const DoctorBookModal: React.FC<Iprops> = props => {
  const {
    isVisible,
    setVisible,
    workPlaceData,
    doctorId,
    specialityId,
    token,
    userId,
    creatingData,
    popNumber,
  } = props;
  const {t} = useTranslation();
  const opacity = useSharedValue(0);
  const {screen} = useAppSelector(state => state.globalReducer);
  const [isModal, setModal] = useState(isVisible);
  const [clinicId, setClinicId] = useState<
    {id: number; clinicId: number; price: number} | undefined
  >();
  const [schedule, setSchedule] = useState<Array<ScheduleModel>>([]);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [getShcedule] = doctorAPI.useGetDoctorScheduleMutation();
  const sliderData = [
    {id: 0, text: t('online'), onPress: (id: number) => setIsOnline(true)},
    {id: 1, text: t('offline'), onPress: (id: number) => setIsOnline(false)},
  ];
  const [activeDate, setActiveDate] = useState<DayType>({
    id: 1,
    dayKey: weeks_name[moment().day()],
    date: moment(new Date()).format('YYYY-MM-DD'),
  });
  const [activeTime, setActiveTime] = useState<TimeType | null>(null);
  const [isButtonActive, setButtonActive] = useState(false);
  const [createRegister] = registerAPI.useCreateRegisterMutation();
  const [createConsultation] = registerAPI.useCreateConsultationMutation();
  const [updateConsultation] = registerAPI.useUpdateConsultationMutation();
  const [getUserRegisters] = userAPI.useGetUserRegistersMutation();
  const dispatch = useAppDispatch();
  const {setUserRegisters} = userSlice.actions;
  const {setRegisterId} = paramsSlice.actions;
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (clinicId) {
      setLoading(true);
      getShcedule({
        token: token,
        params: {
          clinic: clinicId.clinicId,
          doctor: doctorId,
          for_online: isOnline,
        },
      })
        .unwrap()
        .then(res => {
          setSchedule(res);
          setLoading(false);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [clinicId, isOnline]);

  const onTimePicked = (time: TimeType | null) => {
    setActiveTime(time);
    time ? setButtonActive(true) : setButtonActive(false);
  };

  const hideModal = () => {
    setModal(false);
  };

  const onAcceptPress = () => {
    if (isButtonActive) {
      setLoading(true);
      if (creatingData) {
        updateConsult(creatingData);
        return;
      }
      createRegister({
        token: token,
        data: {
          user: userId,
          opened_doctor: doctorId,
          is_payment_required: clinicId!.price > 0 ? true : false,
          is_active: true,
        },
      })
        .unwrap()
        .then(register => {
          if (register.id) {
            createConsult(register.id);
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  const createConsult = (registerId: number) => {
    createConsultation({
      token: token,
      data: {
        register: registerId,
        speciality: specialityId as number,
        doctor: doctorId,
        price_of_speciality: clinicId!.id,
        is_online: isOnline,
        is_payment_required: clinicId!.price > 0 ? true : false,
        scheduled_time: moment(
          `${activeDate.date}T${activeTime!.time}`,
          'YYYY-MM-DDTHH:mm',
        )
          .tz('Europe/London', true)
          .format('YYYY-MM-DDThh:mm:ssZ'),
      },
    })
      .unwrap()
      .then(res => {
        getUserRegisters({
          userId: userId,
          token: token,
        })
          .unwrap()
          .then(registers => {
            const sorted = sortRegister(registers);
            dispatch(setUserRegisters({...sorted}));
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: NavigatorTypes.stacks.mainStack}],
              }),
            );
            // setLoading(false);
          })
          .catch(e => {
            console.log('Register error: ', e);
          });
      })
      .catch(e => console.log(e));
  };

  const updateConsult = ({
    registerId,
    specialityId,
    consultationId,
  }: {
    registerId: number;
    specialityId: number;
    consultationId: number;
  }) => {
    updateConsultation({
      token: token,
      id: consultationId,
      data: {
        register: registerId,
        speciality: specialityId,
        doctor: doctorId,
        price_of_speciality: clinicId!.id,
        is_online: isOnline,
        is_payment_required: clinicId!.price > 0 ? true : false,
        scheduled_time: moment(
          `${activeDate.date}T${activeTime!.time}`,
          'YYYY-MM-DDTHH:mm',
        )
          .tz('Europe/London', true)
          .format('YYYY-MM-DDThh:mm:ssZ'),
      },
    })
      .unwrap()
      .then(consultation => {
        getUserRegisters({
          userId: userId,
          token: token,
        })
          .unwrap()
          .then(registers => {
            const sorted = sortRegister(registers);
            dispatch(setUserRegisters({...sorted}));
            //@ts-ignore
            navigation.pop(popNumber);
          })
          .catch(e => {
            console.log('Register error: ', e);
          });
      })
      .catch(e => console.log(e));
  };

  const rStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  const handleScroll = (event: any) => {
    if (event.nativeEvent.contentOffset.y > 5) {
      !opacity.value && (opacity.value = withTiming(1));
    } else {
      opacity.value && (opacity.value = withTiming(0));
    }
  };

  return (
    <BottomSheetModal
      isVisible={isVisible}
      setVisible={setVisible}
      isModal={isModal}>
      <View style={styles.container}>
        <View style={styles.title_cont}>
          <Text style={styles.title}>{t('doctor_book')}</Text>
          <TouchableOpacity onPress={hideModal}>
            <CloseCircleIcon color={colorPalet.black100} />
          </TouchableOpacity>
        </View>
        <View style={{margin: 20}}>
          <Slider
            data={sliderData}
            options={{
              buttonHeight: 30,
              backgroundColor: 'bgColor',
              marginHorizontal: 0,
            }}
          />
        </View>
        <AnimatedLinearGradient
          pointerEvents={'none'}
          colors={['rgba(0,0,0,0.08)', 'rgba(0,0,0,0)']}
          style={[styles.grad, rStyle, {width: screen.width}]}
        />
        <ScrollView
          style={{height: screen.height - 200, zIndex: -1}}
          contentContainerStyle={{paddingBottom: 90}}
          scrollEventThrottle={100}
          onScroll={handleScroll}
          showsVerticalScrollIndicator={false}>
          <DoctorOrganizationPicker
            workPlaceData={workPlaceData}
            pickedId={clinicId}
            setPickedId={setClinicId}
          />
          <View style={{height: 5}} />
          <DoctorTimePicker
            schedule={schedule[0]}
            weeks_name={weeks_name}
            activeDate={activeDate}
            setActiveDate={setActiveDate}
            activeTime={activeTime}
            setActiveTime={onTimePicked}
          />
        </ScrollView>
        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
          style={[
            {
              width: screen.width,
              height: 50,
              position: 'absolute',
              bottom: 0,
            },
          ]}
        />
        <View style={styles.bottom_cont}>
          <Button
            text={t('accept')}
            onPress={onAcceptPress}
            options={{
              color: isButtonActive ? 'black100' : 'inactive',
              borderRadius: 10,
              buttonHeight: 50,
              buttonWidth: '100%',
              textSize: 14,
            }}
          />
        </View>
        {isLoading ? (
          <Animated.View
            style={styles.loader}
            entering={FadeIn}
            exiting={FadeOut}>
            <LittlePreloader />
          </Animated.View>
        ) : null}
      </View>
    </BottomSheetModal>
  );
};
export default DoctorBookModal;
