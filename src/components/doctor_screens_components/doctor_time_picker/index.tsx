import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, TouchableOpacity, FlatList, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colorPalet} from '../../../resources/style/globalStyle';
import styles from './style';
import moment from 'moment';
import {useAppSelector} from '../../../hooks/redux';
import {HourIntervalsModel} from '../../../models/ClassifiersModel';
import {ScheduleModel} from '../../../models/DoctorModel';
import {DayType, TimeType} from '../doctor_book_modal';

interface Iprops {
  schedule?: ScheduleModel;
  activeDate: DayType;
  setActiveDate: React.Dispatch<React.SetStateAction<DayType>>;
  weeks_name: string[];
  activeTime: TimeType | null;
  setActiveTime: (time: TimeType | null) => void;
}

type DateType = {
  id: number;
  date: string;
  formated: {day: string; dayOfWeek: string; dayKey: string};
};
const {width} = Dimensions.get('window');
const timeItemWidth = (width - 60) / 3;

const DoctorTimePicker: React.FC<Iprops> = props => {
  const {
    schedule,
    activeDate,
    setActiveDate,
    weeks_name,
    activeTime,
    setActiveTime,
  } = props;
  const {t} = useTranslation();
  const {screen} = useAppSelector(state => state.globalReducer);
  const {hourIntervals} = useAppSelector(state => state.classifiersReucer);

  const [dates, setDates] = useState<[] | DateType[]>([]);

  useEffect(() => {
    let daysArr: DateType[] = [
      {
        id: 0,
        date: moment(new Date()).format('YYYY-MM-DD'),
        formated: {
          day: moment().format('DD MMMM'),
          dayOfWeek: moment().format('dddd'),
          dayKey: weeks_name[moment().day()],
        },
      },
    ];
    for (let i = 0; i < 6; i++) {
      daysArr.push({id: i + 1, ...addDay(daysArr[i].date)});
    }
    setDates(daysArr);
  }, []);

  useEffect(() => {
    if (schedule) {
      setActiveDate({
        id: 1,
        dayKey: weeks_name[moment().day()],
        date: moment().format('YYYY-MM-DD'),
      });
      setActiveTime(null);
    }
  }, [schedule]);

  const addDay = (day: string) => {
    let newDay = moment(day, 'YYYY-MM-DD').add(1, 'd');
    return {
      date: newDay.format('YYYY-MM-DD'),
      formated: {
        day: newDay.format('DD MMMM'),
        dayOfWeek: newDay.format('dddd'),
        dayKey: weeks_name[newDay.day()],
      },
    };
  };

  const onDatePress = (data: DayType) => {
    console.log(data);
    setActiveDate({...data});
    setActiveTime(null);
  };
  const onTimePress = ({id, time}: {id: number; time: string}) => {
    setActiveTime({id, time});
  };
  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>{t('date')}</Text>
      <View style={{height: 10}} />
      <FlatList
        horizontal={true}
        contentContainerStyle={{paddingHorizontal: 15}}
        showsHorizontalScrollIndicator={false}
        data={dates}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          return (
            <DateCard
              isActive={activeDate.id === item.id}
              data={item}
              onPress={onDatePress}
            />
          );
        }}
      />
      <View style={{height: 10}} />
      <Text style={styles.title}>{t('time')}</Text>
      <View style={{height: 5}} />
      <View style={styles.times_cont}>
        {hourIntervals.map(item => (
          <TimeCard
            key={item.id}
            isActive={activeTime?.id === item.id}
            available={
              schedule &&
              // @ts-ignore
              schedule[activeDate.dayKey].some(value => value.id === item.id)
            }
            data={item}
            onPress={onTimePress}
          />
        ))}
      </View>
    </View>
  );
};

interface DateCardProps {
  isActive: boolean;
  onPress: ({id, dayKey}: DayType) => void;
  data: DateType;
}
const DateCard = (props: DateCardProps) => {
  const {isActive, data, onPress} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        onPress({id: data.id, dayKey: data.formated.dayKey, date: data.date})
      }>
      <LinearGradient
        style={styles.date_card_cont}
        colors={
          isActive
            ? colorPalet.brandGradient
            : [colorPalet.bgColor, colorPalet.bgColor]
        }
        useAngle={true}
        angle={150}
        angleCenter={{x: 0.8, y: 0.3}}>
        <Text
          style={[
            styles.date_card_title,
            {color: isActive ? colorPalet.white100 : colorPalet.black100},
          ]}>
          {data.formated.day}
        </Text>
        <Text
          style={[
            styles.date_card_subtitle,
            {color: isActive ? colorPalet.white80 : colorPalet.black50},
          ]}>
          {data.formated.dayOfWeek}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

interface TimeCardProps {
  isActive: boolean;
  available: boolean;
  onPress: ({id, time}: {id: number; time: string}) => void;
  data: HourIntervalsModel;
}
const TimeCard = (props: TimeCardProps) => {
  const {isActive, onPress, data, available} = props;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        available &&
        !isActive &&
        onPress({
          id: data.id,
          time: moment(data.hour_from, 'H').format('HH:mm'),
        })
      }
      style={{marginVertical: 5}}>
      <LinearGradient
        style={[styles.times_card_cont, {width: timeItemWidth}]}
        colors={
          available
            ? isActive
              ? colorPalet.brandGradient
              : [colorPalet.bgColor, colorPalet.bgColor]
            : [colorPalet.bgColor, colorPalet.bgColor]
        }
        useAngle={true}
        angle={150}
        angleCenter={{x: 0.8, y: 0.3}}>
        <Text
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={[
            styles.times_card_text,
            {
              color: available
                ? isActive
                  ? colorPalet.white100
                  : colorPalet.black100
                : colorPalet.black20,
            },
          ]}>{`${moment(data.hour_from, 'H').format('HH:mm')} - ${moment(
          data.hour_to,
          'H',
        ).format('HH:mm')}`}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default DoctorTimePicker;
