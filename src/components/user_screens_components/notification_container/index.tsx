import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import {NotificationModel} from '../../../models/NotificationModel';
import NotificationCard from '../notification_card';
import Animated, {
  Layout,
  SlideInLeft,
  SlideOutLeft,
} from 'react-native-reanimated';

interface Iprops {
  data: NotificationModel[];
  remove: (id: string) => void;
}

const NotificationContainer: React.FC<Iprops> = props => {
  const {data, remove} = props;

  const mapItems = data.map(item => {
    return <NotificationCard key={item.id} data={item} remove={remove} />;
  });

  return data.length ? <View style={styles.container}>{mapItems}</View> : null;
};

export default NotificationContainer;
