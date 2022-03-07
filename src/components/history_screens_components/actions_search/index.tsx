import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text} from 'react-native';
import {useAppSelector} from '../../../hooks/redux';
import {ActionModel} from '../../../models/ActionsModel';
import EmptyEvent from '../../global_components/empty_event';
import Titler from '../../global_components/titler';
import ActionCard from '../actions_card';
import styles from './style';

interface Iprops {
  text: string;
}

const searchData: Array<ActionModel> = [
  {
    id: '0',
    title: 12120,
    status: 'active',
    created: {
      date: '2022-12-12',
      doctor: 'Abduhakimova Munavvar',
      speciality: 'Cardiologist',
      imageUrl: 'image',
    },
    warn: {
      text: 'payment_required',
    },
  },
  {
    id: '1',
    title: 15000,
    status: 'active',
    created: {
      date: '2022-12-12',
      doctor: 'Abduhakimova Munavvar',
      speciality: 'Cardiologist',
      imageUrl: 'image',
    },
    warn: {
      text: 'payment_required',
    },
  },
];

const ActionsSearch: React.FC<Iprops> = props => {
  const {t} = useTranslation();
  const {text} = props;
  const {screen} = useAppSelector(state => state.globalReducer);
  const [data, setData] = useState<Array<ActionModel>>([]);
  useEffect(() => {
    if (text.length > 3) {
      console.log(text);
      setData(searchData);
    } else {
      setData([]);
    }
  }, [text]);

  const mapData = data.map(item => {
    return <ActionCard key={item.id} data={item} />;
  });
  return (
    <View>
      <Titler text={t('result')} />
      {data.length > 0 ? (
        <View style={{paddingHorizontal: 20}}>{mapData}</View>
      ) : (
        <View
          style={[
            {
              height:
                screen.height -
                (screen.hasNotch ? 44 : screen.headerSize || 20) -
                300,
            },
            styles.events_cont,
          ]}>
          <EmptyEvent text="No result" icon="SearchIcon" />
        </View>
      )}
    </View>
  );
};

export default ActionsSearch;
