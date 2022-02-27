import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, TouchableOpacity, FlatList, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colorPalet} from '../../../resources/style/globalStyle';
import styles from './style';
import moment from 'moment';
import {useAppSelector} from '../../../hooks/redux';

interface Iprops {}

type DateType = {
  id: number;
  date: string;
  formated: {day: string; dayOfWeek: string};
};
type TimeType = {
  id: number;
  time: {
    start: string;
    end: string;
  };
};

const {width} = Dimensions.get('window');
const timeItemWidth = (width - 60) / 3;

const DoctorTimePicker: React.FC<Iprops> = props => {
  const {} = props;
  const {t} = useTranslation();
  const {screen} = useAppSelector(state => state.globalReducer);
  const [activeDate, setActiveDate] = useState(1);
  const [dates, setDates] = useState<[] | DateType[]>([]);
  const [activeTime, setActiveTime] = useState<null | number>(null);
  const [times, setTimes] = useState<[] | TimeType[]>([]);

  useEffect(() => {
    let daysArr = [
      {
        id: 0,
        date: moment().format('YYYY-MM-DD'),
        formated: {
          day: moment().format('DD MMMM'),
          dayOfWeek: moment().format('dddd'),
        },
      },
    ];
    for (let i = 0; i < 6; i++) {
      daysArr.push({id: i + 1, ...addDay(daysArr[i].date)});
    }
    setDates(daysArr);

    let timesArr = [{id: 0, time: {start: '00:00', end: '01:00'}}];
    for (let i = 0; i < 23; i++) {
      timesArr.push({id: i + 1, time: addHour(timesArr[i].time.end)});
    }
    setTimes(timesArr);
  }, []);

  const addDay = (day: string) => {
    let newDay = moment(day, 'YYYY-MM-DD').add(1, 'd');
    return {
      date: newDay.format('YYYY-MM-DD'),
      formated: {
        day: newDay.format('DD MMMM'),
        dayOfWeek: newDay.format('dddd'),
      },
    };
  };
  const addHour = (time: string) => {
    let newTime = moment(time, 'HH:mm').add(1, 'h').format('HH:mm');
    return {start: time, end: newTime};
  };

  const onDatePress = (id: number) => {
    setActiveDate(id);
  };
  const onTimePress = (id: number) => {
    setActiveTime(id);
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
              isActive={activeDate === item.id}
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
        {times.map(item => (
          <TimeCard
            key={item.id}
            isActive={activeTime === item.id}
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
  onPress: (id: number) => void;
  data: DateType;
}
const DateCard = (props: DateCardProps) => {
  const {isActive, data, onPress} = props;
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(data.id)}>
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
  onPress: (id: number) => void;
  data: TimeType;
}
const TimeCard = (props: TimeCardProps) => {
  const {isActive, onPress, data} = props;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(data.id)}
      style={{marginVertical: 5}}>
      <LinearGradient
        style={[styles.times_card_cont, {width: timeItemWidth}]}
        colors={
          isActive
            ? colorPalet.brandGradient
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
            {color: isActive ? colorPalet.white100 : colorPalet.black100},
          ]}>{`${data.time.start} - ${data.time.end}`}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default DoctorTimePicker;
