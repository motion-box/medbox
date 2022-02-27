import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './style';
import {ClinicModel} from '../../../models/UserModal';

interface Iprops {
  data: ClinicModel;
}

const UserClinic: React.FC<Iprops> = props => {
  const {name, doctor} = props.data;
  return (
    <View style={styles.container}>
      <View style={styles.line}>
        <Text style={styles.title}>Your clinic</Text>
        <Text style={styles.subtitle}>{name}</Text>
      </View>
      <View style={styles.border} />
      <View style={styles.line}>
        <Text style={styles.title}>Doctor</Text>
        <View style={styles.doctor_cont}>
          <Image
            style={styles.image_cont}
            source={require('../../../resources/images/img4.png')}
          />
          <View>
            <Text style={styles.subtitle}>{doctor.name}</Text>
            <Text style={styles.speciality}>{doctor.speciality}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserClinic;
