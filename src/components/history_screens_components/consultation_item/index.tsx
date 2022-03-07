import React from 'react';
import {View} from 'react-native';
import styles from './style';
import BookNotActiveItem from './item_types/book_not_active_item';
import ActiveItem from './item_types/active_item';
import ChooseDoctorItem from './item_types/choose_doctor_item';
import ClosedItem from './item_types/closed_item';

type cardTypes =
  | 'bookDoctor'
  | 'notPaid'
  | 'notTime'
  | 'time'
  | 'bookNoDoctor'
  | 'closed';
interface Iprops {
  data: {
    type: 'online' | 'offline';
    card: cardTypes;
  };
}

//TODO: Rorder cards by types

const ConsultationItem: React.FC<Iprops> = props => {
  const {type, card} = props.data;

  return (
    <View style={styles.container}>
      {card === 'bookDoctor' && (
        <BookNotActiveItem
          type={type}
          doctor={{
            id: 0,
            name: 'Abduhakimova Munavvar',
            speciality: 'Cardiologist',
            imageUrl: '',
          }}
        />
      )}
      {card === 'notPaid' && (
        <ActiveItem
          type={type}
          doctor={{
            id: 0,
            name: 'Abduhakimova Munavvar',
            speciality: 'Cardiologist',
            imageUrl: '',
          }}
          workPlace={{
            imageUrl: '',
            name: 'Shox Internation Hospital',
            price: 219200,
          }}
          paid={false}
          date="2022-03-05T20:00"
          startDate="2022-03-06T21:00"
        />
      )}
      {card === 'notTime' && (
        <ActiveItem
          type={type}
          doctor={{
            id: 0,
            name: 'Abduhakimova Munavvar',
            speciality: 'Cardiologist',
            imageUrl: '',
          }}
          workPlace={{
            imageUrl: '',
            name: 'Shox Internation Hospital',
            price: 219200,
          }}
          paid={true}
          date="2022-03-05T20:00"
          startDate="2022-03-06T20:10"
        />
      )}
      {card === 'time' && (
        <ActiveItem
          type={type}
          doctor={{
            id: 0,
            name: 'Abduhakimova Munavvar',
            speciality: 'Cardiologist',
            imageUrl: '',
          }}
          workPlace={{
            imageUrl: '',
            name: 'Shox Internation Hospital',
            price: 199500,
          }}
          paid={true}
          date="2022-03-04T20:00"
          startDate="2022-03-04T21:00"
        />
      )}
      {card === 'bookNoDoctor' && (
        <ChooseDoctorItem
          type={type}
          speciality="Cardiologist"
          description="Technical and Procedural Aspects of a Staged Repair of a Giant Post-Dissection"
          doctors={[
            {
              id: 0,
              imageUrl: '',
              name: 'Abduhakimova Munavvar',
              speciality: 'Cardiologist',
              rate: 4,
              price: 129200,
            },
            {
              id: 1,
              imageUrl: '',
              name: 'Abduhakimova Munavvar',
              speciality: 'Cardiologist',
              rate: 5,
              price: 215800,
            },
          ]}
        />
      )}
      {card === 'closed' && (
        <ClosedItem
          type={type}
          doctor={{
            id: 0,
            name: 'Abduhakimova Munavvar',
            speciality: 'Cardiologist',
            imageUrl: '',
          }}
          workPlace={{
            imageUrl: '',
            name: 'Shox Internation Hospital',
            price: 199500,
          }}
          date="2022-01-02T13:00"
          conclusion="Technical and Procedural Aspects of a Staged Repair of a Giant Post-Dissection Aneurysm by Using Endosizing- Based Endovascular Stenting Following Aortic Surgical Repair with Simultaneous Debranching Technique"
        />
      )}
    </View>
  );
};

export default ConsultationItem;
