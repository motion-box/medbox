import moment from 'moment';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BloodType} from '../../../models/UserModal';
import {colorPalet} from '../../../resources/style/globalStyle';
import styles from './style';

interface Iprops {
  data: {
    blood_type: BloodType | null;
    birth_date: string;
    gender: 'male' | 'female';
    address: string;
  };
}

const UserInfo: React.FC<Iprops> = props => {
  const {t} = useTranslation();
  const {blood_type, birth_date, gender, address} = props.data;
  return (
    <View style={styles.container}>
      <View style={styles.line}>
        <Text style={styles.title}>{t('blood_type')}</Text>
        {blood_type ? (
          <LinearGradient
            colors={colorPalet.brandGradient}
            start={{x: -2, y: -2}}
            useAngle={true}
            angle={160}
            style={styles.gradient_cont}>
            <Text style={styles.blud_text}>{blood_type.name}</Text>
          </LinearGradient>
        ) : (
          <Text style={styles.subtitle}>{t('not_specified')}</Text>
        )}
      </View>
      <View style={styles.border} />
      <View style={styles.line}>
        <Text style={styles.title}>{t('age')}</Text>
        <Text style={styles.subtitle}>{`${moment().diff(
          birth_date,
          'years',
        )} ${t('years_old')}`}</Text>
      </View>
      <View style={styles.border} />
      <View style={styles.line}>
        <Text style={styles.title}>{t('gender')}</Text>
        <Text style={styles.subtitle}>{t(gender)}</Text>
      </View>
      <View style={styles.border} />
      <View style={styles.line}>
        <Text style={styles.title}>{t('address')}</Text>
        <View style={{width: 10}} />
        <Text
          style={[styles.subtitle, {flex: 1, textAlign: 'right'}]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {address}
        </Text>
      </View>
    </View>
  );
};

export default UserInfo;
