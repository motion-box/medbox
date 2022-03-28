import React from 'react';
import {View} from 'react-native';
import ActionCard from '../actions_card';
import Titler from '../../global_components/titler';
import styles from './style';
import EmptyEvent from '../../global_components/empty_event';
import {RegisterModel} from '../../../models/HistoryItemsModel';
import {useAppSelector} from '../../../hooks/redux';

interface Iprops {
  titleText?: string;
  data: RegisterModel[];
}

const Actions: React.FC<Iprops> = props => {
  const {titleText, data} = props;
  const {lang} = useAppSelector(state => state.globalReducer);
  const {specialities} = useAppSelector(state => state.classifiersReucer);
  const mapItems = data.map(item => (
    <ActionCard
      key={item.id}
      data={item}
      lang={lang}
      specialities={specialities}
    />
  ));
  return (
    <View>
      {titleText ? <Titler text={titleText} /> : null}
      {data.length ? (
        <View style={styles.cards_cont}>{mapItems}</View>
      ) : (
        <EmptyEvent text="No actions" icon="ClipboardIcon" />
      )}
    </View>
  );
};

export default Actions;
