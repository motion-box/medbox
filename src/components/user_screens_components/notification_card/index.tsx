import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './style';
import {NotificationModel} from '../../../models/NotificationModel';
import {CloseIcon} from '../../../resources/icons/icons';
import moment from 'moment';
import {colorPalet} from '../../../resources/style/globalStyle';
import Animated, {
  FadeInLeft,
  FadeOutLeft,
  Layout,
  SlideInLeft,
  SlideOutLeft,
} from 'react-native-reanimated';

interface Iprops {
  data: NotificationModel;
  remove: (id: string) => void;
}

const NotificationCard: React.FC<Iprops> = props => {
  const {remove} = props;
  const {id, status, doctor, speciality, date, description} = props.data;

  const statusColor =
    status === 'attention'
      ? colorPalet.brandYellow
      : status === 'idle'
      ? colorPalet.brandGreen
      : colorPalet.brandRed;
  return (
    <Animated.View
      style={styles.container}
      layout={Layout.springify()}
      entering={SlideInLeft.duration(300)}
      exiting={SlideOutLeft.duration(300)}>
      <View style={styles.card_cont}>
        <View style={[styles.status, {backgroundColor: statusColor}]} />
        <View style={styles.content}>
          <View style={styles.line}>
            <Text style={styles.title}>{status}</Text>
            <TouchableOpacity onPress={() => remove(id)}>
              <CloseIcon width="16" height="16" />
            </TouchableOpacity>
          </View>
          <View style={styles.line}>
            <View style={styles.doctor_cont}>
              <Image
                style={styles.doctor_image}
                source={require('../../../resources/images/nurse2.png')}
              />
              <View>
                <Text style={styles.doctor_title}>{doctor}</Text>
                <Text style={styles.description}>{speciality}</Text>
              </View>
            </View>
            <Text style={styles.description}>
              {moment(date, 'YYYY-MM-DD-HH:mm').format('DD.MM.YY HH:mm')}
            </Text>
          </View>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default NotificationCard;
