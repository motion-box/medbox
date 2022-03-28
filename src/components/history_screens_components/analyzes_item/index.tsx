import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Image,
  ImageSourcePropType,
} from 'react-native';
import CardTitler from '../../global_components/card_titler';
import styles from './style';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import HospitalInfo from '../hospital_info';
import Button from '../../global_components/button';
import {useAppSelector} from '../../../hooks/redux';
import CtScan, {CtScanItemProps} from './ct_scan';
import BloodTest, {BloodTestItemProps} from './blood_test';

export type AnayzesProps = {
  title: string;
  description?: string;
  services?: ServiceProps[];
  service?: ServiceProps;
  date?: string;
  doctor?: {
    id: number;
    imageUrl: string;
    name: string;
    speciality: string;
  };
  conclusion?: string;
} & dataByCardType;
type dataByCardType =
  | {type: 'ct_scan'; data?: CtScanItemProps}
  | {type: 'blood_test'; data?: BloodTestItemProps[]};

type ServiceProps = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

const AnalyzesItem: React.FC<AnayzesProps> = props => {
  const {t} = useTranslation();
  const {screen} = useAppSelector(state => state.globalReducer);
  const {
    type,
    title,
    description,
    services,
    service,
    date,
    doctor,
    data,
    conclusion,
  } = props;

  return (
    <View style={styles.container}>
      {!doctor ? (
        <View style={styles.title_cont}>
          <Text style={styles.title}>{title}</Text>
          {date && (
            <Text style={styles.date}>
              {moment(date, 'YYYY-MM-DDTHH:mm').format('DD.MM.YY HH:mm')}
            </Text>
          )}
        </View>
      ) : (
        <>
          <CardTitler
            imageUrl=""
            name="Abduhakimova Munavvar"
            subtitle="Cardiologist"
            right={{
              centered: {
                text: moment(date, 'YYYY-MM-DDTHH:mm').format('DD.MM.YY HH:mm'),
                options: [
                  {
                    icon: 'NurseIcon',
                    text: t('doctor_info'),
                    disabled: false,
                    onPress: () => console.log('doctor ID: ' + doctor.id),
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
          <View style={{height: 10}} />
        </>
      )}
      {description && (
        <Text style={[styles.description, {marginBottom: 10}]}>
          {description}
        </Text>
      )}
      {service && (
        <View style={styles.services_cont}>
          <TouchableOpacity style={styles.services_item} activeOpacity={0.8}>
            <HospitalInfo {...service} color="bgColor" />
          </TouchableOpacity>
        </View>
      )}
      {type === 'ct_scan' && data && (
        <>
          <CtScan data={data as CtScanItemProps} title={title} />
        </>
      )}
      {type === 'blood_test' && (
        <>
          <BloodTest data={data as BloodTestItemProps[]} />
        </>
      )}
      {services && (
        <>
          <Text style={[styles.title, {marginBottom: 10}]}>
            {t('services')}
          </Text>
          <View style={styles.services_cont}>
            {services.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.services_item,
                  {borderBottomWidth: services.length - index === 1 ? 0 : 0.3},
                ]}
                activeOpacity={0.8}>
                <HospitalInfo {...item} color="bgColor" />
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
      {conclusion && (
        <View>
          <Text style={[styles.title, {marginBottom: 10}]}>
            {t('conclusion')}
          </Text>
          <Text style={styles.description}>{conclusion}</Text>
        </View>
      )}
      {!doctor && (
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Button
              text={service ? t('pay') : t('show_more')}
              icon={service ? 'WalletIcon' : undefined}
              onPress={() => console.log(service ? 'pay' : 'show more')}
              options={{
                textSize: 14,
                buttonWidth: '100%',
                buttonHeight: 40,
              }}
            />
          </View>
          {service && (
            <>
              <View style={{width: 10}} />
              <View style={{flex: 1}}>
                <Button
                  text={t('show_on_map')}
                  icon={'RoadMapIcon'}
                  onPress={() => console.log('show on map')}
                  options={{
                    textSize: 14,
                    buttonWidth: '100%',
                    buttonHeight: 40,
                  }}
                />
              </View>
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default AnalyzesItem;
