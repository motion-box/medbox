import React from 'react';
import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {UserInfoModel} from '../../../models/UserModal';
import {colorPalet} from '../../../resources/style/globalStyle';
import styles from './style';

interface Iprops {
  data: UserInfoModel;
}

const UserInfo: React.FC<Iprops> = props => {
  const {bloodType, age, sex, address} = props.data;
  return (
    <View style={styles.container}>
      <View style={styles.line}>
        <Text style={styles.title}>Blood type</Text>
        <LinearGradient
          colors={colorPalet.brandGradient}
          start={{x: -2, y: -2}}
          useAngle={true}
          angle={160}
          style={styles.gradient_cont}>
          <Text style={styles.blud_text}>{bloodType}</Text>
        </LinearGradient>
      </View>
      <View style={styles.border} />
      <View style={styles.line}>
        <Text style={styles.title}>Age</Text>
        <Text style={styles.subtitle}>{`${age} years old`}</Text>
      </View>
      <View style={styles.border} />
      <View style={styles.line}>
        <Text style={styles.title}>Sex</Text>
        <Text style={styles.subtitle}>{sex}</Text>
      </View>
      <View style={styles.border} />
      <View style={styles.line}>
        <Text style={styles.title}>Address</Text>
        <Text style={styles.subtitle}>{address}</Text>
      </View>
    </View>
  );
};

export default UserInfo;
