import React from 'react';
import {View, FlatList, Alert} from 'react-native';
import styles from './style';
import {useAppSelector} from '../../../hooks/redux';
import Titler from '../../global_components/titler';
import NewsCard from '../news_card';
import {NewsModel} from '../../../models/NewsModel';

interface Iprops {
  data: NewsModel[];
}

const NewsCarousel: React.FC<Iprops> = props => {
  const {data} = props;
  const {screen} = useAppSelector(state => state.globalReducer);

  return (
    <View style={styles.container}>
      <Titler
        text="Last News"
        subtext="View All"
        onPress={() => Alert.alert('View all')}
      />
      <FlatList
        snapToInterval={screen.width - 40 + 10}
        snapToAlignment="start"
        style={{marginTop: 10}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        contentContainerStyle={{paddingHorizontal: 15}}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return <NewsCard data={item} />;
        }}
      />
    </View>
  );
};

export default NewsCarousel;
