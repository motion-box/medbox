import React from 'react';
import {View} from 'react-native';
import styles from './style';
import BookNotActiveItem from './item_types/book_not_active_item';
import ActiveItem from './item_types/active_item';
import ChooseDoctorItem from './item_types/choose_doctor_item';
import ClosedItem from './item_types/closed_item';
import {ConsultationModel} from '../../../models/HistoryItemsModel';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavigatorTypes} from '../../../navigation';
import {useAppSelector} from '../../../hooks/redux';

type cardTypes =
  | 'bookDoctor'
  | 'notPaid'
  | 'notTime'
  | 'time'
  | 'bookNoDoctor'
  | 'closed';
interface Iprops {
  lang: 'ru' | 'en' | 'uz';
  data: ConsultationModel;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalData: React.Dispatch<
    React.SetStateAction<{
      id: number;
      image: string | undefined;
      full_name: string;
      speciality: string;
      isEstimate: boolean;
      consultationId: number;
    } | null>
  >;
}

//TODO: Rorder cards by types

const ConsultationItem: React.FC<Iprops> = ({
  data,
  lang,
  setModal,
  setModalData,
}) => {
  const {
    id,
    doctor,
    conclusion,
    speciality,
    scheduled_time,
    is_online,
    is_payment_required,
    price_of_speciality,
  } = data;
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const {registerId} = useAppSelector(state => state.paramsReducer);

  const onDoctorInfoPress = () => {
    doctor?.id &&
      navigation.navigate(NavigatorTypes.doctorStack.doctorScreen, {
        id: doctor.id,
        read_only: true,
      });
  };
  const onOtherPress = (isEstimate: boolean) => {
    setModalData({
      id: doctor!.id,
      image: doctor?.photo,
      full_name: `${doctor?.first_name} ${doctor?.last_name}`,
      speciality: speciality[`name_${lang}`],
      isEstimate: isEstimate,
      consultationId: id,
    });
    setModal(true);
  };

  return (
    <View style={styles.container}>
      {doctor && !scheduled_time && !price_of_speciality && (
        <BookNotActiveItem
          type={is_online ? 'online' : 'offline'}
          doctor={{
            id: doctor!.id,
            name: `${doctor?.first_name} ${doctor?.last_name}`,
            speciality: speciality[`name_${lang}`],
            imageUrl: doctor!.photo,
          }}
        />
      )}
      {doctor && scheduled_time && price_of_speciality && !conclusion ? (
        <ActiveItem
          onDoctorInfoPress={onDoctorInfoPress}
          onOtherPress={onOtherPress}
          type={is_online ? 'online' : 'offline'}
          doctor={{
            id: doctor!.id,
            name: `${doctor?.first_name} ${doctor?.last_name}`,
            speciality: speciality[`name_${lang}`],
            imageUrl: doctor!.photo,
          }}
          workPlace={{
            imageUrl: price_of_speciality.clinic.photo,
            name: price_of_speciality.clinic.name,
            price: price_of_speciality.price,
            latitude: price_of_speciality.clinic.latitude,
            longitude: price_of_speciality.clinic.longitude,
          }}
          paid={!is_payment_required}
          date={scheduled_time}
          startDate={scheduled_time}
          paymentData={{
            registerId: registerId as number,
            specialityId: speciality.id,
            conclusionId: id,
            price: price_of_speciality.price,
          }}
        />
      ) : null}
      {!doctor && (
        <ChooseDoctorItem
          type={is_online ? 'online' : 'offline'}
          specialityId={speciality.id}
          speciality={speciality[`name_${lang}`]}
          description={speciality[`description_${lang}`]}
          consultationId={id}
        />
      )}
      {conclusion && doctor && price_of_speciality ? (
        <ClosedItem
          onDoctorInfoPress={onDoctorInfoPress}
          onOtherPress={onOtherPress}
          type={is_online ? 'online' : 'offline'}
          doctor={{
            id: doctor.id,
            name: `${doctor.first_name} ${doctor.last_name}`,
            speciality: speciality[`name_${lang}`],
            imageUrl: doctor.photo,
          }}
          workPlace={{
            imageUrl: price_of_speciality.clinic.photo,
            name: price_of_speciality.clinic.name,
            price: price_of_speciality.price,
          }}
          date={scheduled_time}
          conclusion={conclusion}
        />
      ) : null}
    </View>
  );
};

export default ConsultationItem;
