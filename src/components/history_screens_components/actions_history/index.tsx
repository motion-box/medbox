import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import Titler from '../../global_components/titler';
import {ActionHistoryModel} from '../../../models/ActionsModel';
import Actions from '../actions';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import {RegisterModel} from '../../../models/HistoryItemsModel';

interface Iprops {
  data: Array<RegisterModel>;
}

const ActionsHistory: React.FC<Iprops> = props => {
  const {t} = useTranslation();
  const {data} = props;

  // const mapingHistory = () => {
  //   let historyArr: Element[] = [];
  //   for (const [key, actions] of Object.entries(data))
  //     historyArr.push(
  //       <React.Fragment key={key}>
  //         <View style={styles.date_cont}>
  //           <Text style={styles.date_text}>
  //             {moment(key, 'MM/YYYY').format('MMMM YYYY')}
  //           </Text>
  //         </View>
  //         <Actions data={actions} />
  //       </React.Fragment>,
  //     );
  //   return historyArr;
  // };
  // const historyItems = mapingHistory();

  return (
    <View style={styles.container}>
      {/* <Titler text={t('patient_history_history')} /> */}
      {/* {historyItems} */}
      <Actions titleText={t('patient_history_history')} data={data} />
    </View>
  );
};

export default ActionsHistory;
