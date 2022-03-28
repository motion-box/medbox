import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useAppSelector} from '../../../hooks/redux';
import {NewsModel} from '../../../models/NewsModel';
import {colorPalet} from '../../../resources/style/globalStyle';
import Button from '../../global_components/button';
import styles from './style';

interface Iprops {
  data: NewsModel;
  onPress: (data: NewsModel) => void;
}

const NewsCard: React.FC<Iprops> = ({data, onPress}) => {
  const {t} = useTranslation();
  const {screen, lang} = useAppSelector(state => state.globalReducer);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          width: screen.width - 40,
          height: (screen.width - 40) / 1.86,
        },
      ]}
      activeOpacity={1}
      onPress={() => onPress(data)}>
      <View style={styles.content_cont}>
        <View style={{width: '70%'}}>
          <Text style={styles.title} numberOfLines={2}>
            {data[`title_${lang}`]}
          </Text>
          <Text style={styles.subtitle} numberOfLines={3}>
            {data[`subtitle_${lang}`]}
          </Text>
        </View>
        <View style={{alignItems: 'flex-start'}}>
          <View style={styles.button}>
            <Text style={styles.button_text}>{t('read_more')}</Text>
          </View>
        </View>
      </View>
      <Image source={{uri: data.album}} style={styles.image} />
    </TouchableOpacity>
  );
};

export default NewsCard;
