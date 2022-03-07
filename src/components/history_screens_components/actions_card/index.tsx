import React from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import styles from './style';
import {ActionModel} from '../../../models/ActionsModel';
import LinearGradient from 'react-native-linear-gradient';
import {colorPalet} from '../../../resources/style/globalStyle';
import moment from 'moment';
import CardTitler from '../../global_components/card_titler';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NavigatorTypes} from '../../../navigation';
import {StackNavigationProp} from '@react-navigation/stack';

interface Iprops {
  data: ActionModel;
}

const ActionCard: React.FC<Iprops> = props => {
  const {t} = useTranslation();
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const {id, title, status, created, finished, warn} = props.data;
  const activeGrad = colorPalet.brandGradient;
  const cancleGrad = colorPalet.redGradient;
  const closedGrad = [colorPalet.black10, colorPalet.black10];
  const statusGrad =
    status === 'active'
      ? activeGrad
      : status === 'canceled'
      ? cancleGrad
      : closedGrad;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate(NavigatorTypes.stacks.historyStack, {
          id: id,
          title: title,
        })
      }>
      <View style={styles.line}>
        <Text style={styles.title}>{`№ ${title
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}`}</Text>
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
            ]}
            adjustsFontSizeToFit={true}
            numberOfLines={1}>
            {t(status)}
          </Text>
        </LinearGradient>
      </View>
      <CardTitler
        imageUrl={created.imageUrl}
        name={created.doctor}
        subtitle={created.speciality}
        right={{
          boldFirst: {
            title: `${t('created')}:`,
            subtitle: moment(created.date, 'YYYY-MM-DD').format('DD.MM.YY'),
          },
        }}
      />
      {finished && (
        <>
          <View style={styles.border} />
          <CardTitler
            imageUrl={finished.imageUrl}
            name={finished.doctor}
            subtitle={finished.speciality}
            right={{
              boldFirst: {
                title: `${t('finished')}:`,
                subtitle: moment(finished.date, 'YYYY-MM-DD').format(
                  'DD.MM.YY',
                ),
              },
            }}
          />
        </>
      )}
      {warn && (
        <View style={styles.warn_cont}>
          <View
            style={[
              styles.warn_color,
              {backgroundColor: colorPalet.brandYellow},
            ]}
          />
          <Text style={styles.warn}>{t(warn.text)}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ActionCard;
