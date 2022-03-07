import React from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from './style';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import CardTitler from '../../global_components/card_titler';

export interface PrescriptionItemProps {
  id: number;
  doctor: {
    id: number;
    imageUrl: string;
    name: string;
    speciality: string;
  };
  date: string;
  data: Medicamets[];
}
type Medicamets = {
  id: number;
  name: string;
  period: string;
  amount: number;
  notation: string;
};

const PrescriptionItem: React.FC<PrescriptionItemProps> = props => {
  const {t} = useTranslation();
  const {id, doctor, date, data} = props;
  return (
    <View style={styles.container}>
      <CardTitler
        name={doctor.name}
        subtitle={doctor.speciality}
        imageUrl={doctor.imageUrl}
        right={{
          centered: {
            text: moment(date, 'YYYY-MM-DDTHH:mm').format('DD.MM.YY HH:mm'),
            options: [
              {
                icon: 'NurseIcon',
                text: t('doctor_info'),
                disabled: false,
                onPress: () => console.log('doctor info'),
              },
              {
                icon: 'StarFillIcon',
                text: t('estimate'),
                disabled: false,
                onPress: () => console.log('estimate'),
              },
              {
                icon: 'AlarmWarningIcon',
                text: t('complain'),
                disabled: false,
                onPress: () => console.log('complain'),
              },
            ],
          },
        }}
      />
      <View style={styles.medicaments_cont}>
        {data.map((item, index) => (
          <React.Fragment key={item.id}>
            <View style={styles.item_cont}>
              <View style={styles.item_left}>
                <Text style={styles.item_name}>{item.name}</Text>
                <Text style={styles.period}>{item.period}</Text>
              </View>
              <View style={styles.item_right}>
                <Text style={styles.amount}>{item.amount}</Text>
                <Text style={styles.notation}>{item.notation}</Text>
              </View>
            </View>
            {index !== data.length - 1 && <View style={styles.line} />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

export default PrescriptionItem;
