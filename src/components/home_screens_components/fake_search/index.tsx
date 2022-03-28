import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import {NavigatorTypes} from '../../../navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {EqualizerIcon, SearchIcon} from '../../../resources/icons/icons';
import {colorPalet} from '../../../resources/style/globalStyle';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '../../../hooks/redux';

interface Iprops {}

interface NavigationParams {
  params?: {
    id: number;
    index: number;
    name: string;
  };
  isModal: boolean;
  isFocus: boolean;
}

const FakeSearch = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const {specialities} = useAppSelector(state => state.classifiersReucer);
  const {lang} = useAppSelector(state => state.globalReducer);

  const onPress = ({params, isFocus, isModal}: NavigationParams) => {
    navigation.navigate(NavigatorTypes.homeStack.searchScreen, {
      filterSpeciality: params,
      isModal,
      isFocus,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.top_cont}>
        <TouchableOpacity
          style={styles.search_cont}
          onPress={() => onPress({isFocus: true, isModal: false})}>
          <View style={styles.input}>
            <SearchIcon width="16" height="16" color={colorPalet.black50} />
            <View style={{width: 10}} />
            <Text style={styles.input_text}>{t('search_doctor')}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settings_button}
          onPress={() => onPress({isFocus: false, isModal: true})}>
          <EqualizerIcon width="16" height="16" color={colorPalet.black50} />
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={{paddingHorizontal: 15}}
        style={styles.filter}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={specialities}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={styles.filter_intem}
              onPress={() =>
                onPress({
                  isFocus: false,
                  isModal: false,
                  params: {id: item.id, index, name: item[`name_${lang}`]},
                })
              }>
              <Text style={styles.filter_text}>{item[`name_${lang}`]}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default FakeSearch;
