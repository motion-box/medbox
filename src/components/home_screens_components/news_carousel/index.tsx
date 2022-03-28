import React, {useEffect, useState} from 'react';
import {View, FlatList, Alert} from 'react-native';
import styles from './style';
import {useAppSelector} from '../../../hooks/redux';
import Titler from '../../global_components/titler';
import NewsCard from '../news_card';
import {NewsModel} from '../../../models/NewsModel';
import {useTranslation} from 'react-i18next';
import {classifiersAPI} from '../../../services/ClassifiersService';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {NavigatorTypes} from '../../../navigation';

interface Iprops {}

const NewsCarousel: React.FC<Iprops> = props => {
  const {t} = useTranslation();
  const {screen} = useAppSelector(state => state.globalReducer);
  const [getNews] = classifiersAPI.useGetNewsMutation();
  const {accessData} = useAppSelector(state => state.userReducer);
  const [data, setData] = useState<NewsModel[]>([]);
  const navigation = useNavigation<StackNavigationProp<any, any>>();

  useEffect(() => {
    getNews({token: accessData!.token, params: {type: 0}})
      .unwrap()
      .then(res => {
        if (res.length) {
          setData(res);
        }
      })
      .catch(e => console.log(e));
  }, []);

  const onCardPress = (item: NewsModel) => {
    navigation.navigate(NavigatorTypes.homeStack.newsScreen, {
      data: item,
    });
  };

  return (
    <View style={styles.container}>
      <Titler
        text={t('news_last')}
        subtext={t('view_all')}
        onPress={() =>
          navigation.navigate(NavigatorTypes.homeStack.newsOverallScreen)
        }
      />
      <FlatList
        snapToInterval={screen.width - 40 + 10}
        snapToAlignment="start"
        style={{marginTop: 10, height: (screen.width - 40) / 1.86}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        contentContainerStyle={{paddingHorizontal: 15}}
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          return <NewsCard data={item} onPress={onCardPress} />;
        }}
      />
    </View>
  );
};

export default NewsCarousel;
