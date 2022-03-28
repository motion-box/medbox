import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {useAppSelector} from '../../../hooks/redux';
import {RegisterModel} from '../../../models/HistoryItemsModel';
import {userAPI} from '../../../services/UserService';
import EmptyEvent from '../../global_components/empty_event';
import Titler from '../../global_components/titler';
import ActionCard from '../actions_card';
import styles from './style';
interface Iprops {
  text: string;
}

const ActionsSearch: React.FC<Iprops> = props => {
  const {t} = useTranslation();
  const {text} = props;
  const {accessData} = useAppSelector(state => state.userReducer);
  const {screen, lang} = useAppSelector(state => state.globalReducer);
  const {specialities} = useAppSelector(state => state.classifiersReucer);
  const [getRegister] = userAPI.useGetUserRegistersMutation();
  const [data, setData] = useState<Array<RegisterModel>>([]);

  useEffect(() => {
    if (text.length) {
      getRegister({
        token: accessData!.token,
        userId: accessData!.id,
        search: text,
      })
        .unwrap()
        .then(res => {
          setData(res);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      setData([]);
    }
  }, [text]);

  const mapData = data.map(item => {
    return (
      <Animated.View key={item.id} entering={FadeInDown}>
        <ActionCard data={item} specialities={specialities} lang={lang} />
      </Animated.View>
    );
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
