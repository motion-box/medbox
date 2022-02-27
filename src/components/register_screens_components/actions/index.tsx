import React from 'react';
import {View} from 'react-native';
import ActionCard from '../actions_card';
import Titler from '../../global_components/titler';
import styles from './style';
import {ActionModel} from '../../../models/ActionsModel';
import EmptyEvent from '../../global_components/empty_event';

interface Iprops {
  titleText?: string;
  data: ActionModel[];
}

const Actions: React.FC<Iprops> = props => {
  const {titleText, data} = props;
  const mapItems = data.map(item => <ActionCard key={item.id} data={item} />);
  return (
    <View style={{marginTop: titleText ? 20 : 0}}>
      {titleText && <Titler text={titleText} />}
      {data.length ? (
        <View style={styles.cards_cont}>{mapItems}</View>
      ) : (
        <EmptyEvent text="No actions" icon="ClipboardIcon" />
      )}
    </View>
  );
};

export default Actions;
