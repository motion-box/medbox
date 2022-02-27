import React from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import styles from './style';
import {ActionModel} from '../../../models/ActionsModel';
import LinearGradient from 'react-native-linear-gradient';
import {colorPalet} from '../../../resources/style/globalStyle';
import moment from 'moment';

interface Iprops {
  data: ActionModel;
}

const ActionCard: React.FC<Iprops> = props => {
  const {id, title, status, created, finished} = props.data;
  const activeGrad = colorPalet.brandGradient;
  const cancleGrad = colorPalet.redGradient;
  const closedGrad = [colorPalet.black10, colorPalet.black10];
  const statusGrad =
    status === 'active'
      ? activeGrad
      : status === 'canceled'
      ? cancleGrad
      : closedGrad;

  const doctor = (type: string, data: typeof created) => {
    return (
      <>
        {type === 'finished' && <View style={styles.border} />}
        <View style={styles.line}>
          <View style={styles.doctor_cont}>
            <LinearGradient
              colors={activeGrad}
              style={styles.image_cont}
              start={{x: 0.5, y: 0.5}}
              end={{x: 1, y: 1}}
              useAngle={true}
              angleCenter={{x: 0.5, y: 0.5}}
              angle={160}>
              <Image
                source={require('../../../resources/images/nurse.png')}
                style={styles.image}
              />
            </LinearGradient>
            <View style={styles.doctor_text_cont}>
              <Text style={styles.doctor_name} numberOfLines={1}>
                {data.doctor}
              </Text>
              <Text style={styles.doctor_speciality} numberOfLines={1}>
                {data.speciality}
              </Text>
            </View>
          </View>
          <View style={styles.date_cont}>
            <Text style={styles.date}>{type}:</Text>
            <Text style={styles.date}>
              {moment(data.date, 'YYYY-MM-DD').format('DD.MM.YY')}
            </Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => Alert.alert(`Action ID: ${title}`)}>
      <View style={styles.line}>
        <Text style={styles.title}>{`№ ${title}`}</Text>
        <LinearGradient
          colors={statusGrad}
          style={styles.status_cont}
          start={{x: 0.5, y: 0.5}}
          end={{x: 1, y: 1}}
          useAngle={true}
          angleCenter={{x: 0.5, y: 0.5}}
          angle={160}>
          <Text
            style={[
              styles.status_text,
              {
                color:
                  status !== 'closed'
                    ? colorPalet.white100
                    : colorPalet.black50,
              },
            ]}>
            {status}
          </Text>
        </LinearGradient>
      </View>
      {doctor('created', created)}
      {finished && doctor('finished', finished)}
    </TouchableOpacity>
  );
};

export default ActionCard;
