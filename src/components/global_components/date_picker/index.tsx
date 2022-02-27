import React, {useState} from 'react';
import {View, Text, Pressable, Platform} from 'react-native';
import styles from './style';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';
import {CalendarIcon} from '../../../resources/icons/icons';
import moment from 'moment';
import {useAppSelector} from '../../../hooks/redux';
import {useTranslation} from 'react-i18next';

interface Iprops {
  date: string;
  setDate: (date: string) => void;
  placeholder: string;
  mode?: 'date' | 'datetime' | 'time';
  maxDate?: string;
  minDate?: string;
}

enum dateformat {
  datetime = 'DD.MM.YYYY HH:mm',
  date = 'DD.MM.YYYY',
  time = 'HH:mm',
}

const DatePicker: React.FC<Iprops> = props => {
  const {t} = useTranslation();
  const {lang} = useAppSelector(state => state.globalReducer);
  const {
    placeholder,
    mode = 'datetime',
    date,
    setDate,
    maxDate,
    minDate,
  } = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setDate(moment(date).format(dateformat[mode]));
    hideDatePicker();
  };

  return (
    <View>
      <Pressable onPress={showDatePicker} style={styles.container}>
        <Text
          style={[
            styles.text,
            {color: date ? colorPalet.black100 : colorPalet.black20},
          ]}>
          {date || placeholder}
        </Text>
        <CalendarIcon width="16" height="16" color={colorPalet.black50} />
      </Pressable>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        display={Platform.OS === 'ios' ? ('inline' as 'default') : 'default'}
        mode={mode}
        locale={lang}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        confirmTextIOS={t('select')}
        cancelTextIOS={t('cancel')}
        maximumDate={
          maxDate ? moment(maxDate, dateformat[mode]).toDate() : undefined
        }
        minimumDate={
          minDate ? moment(minDate, dateformat[mode]).toDate() : undefined
        }
      />
    </View>
  );
};

export default DatePicker;
