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
}

const NewsCard: React.FC<Iprops> = props => {
  const {t} = useTranslation();
  const {id, title, subTitle, description, imageUrl} = props.data;
  const {screen} = useAppSelector(state => state.globalReducer);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          width: screen.width - 40,
        },
      ]}
      activeOpacity={1}
      onPress={() => Alert.alert(`News id is: ${id}`)}>
      <LinearGradient
        colors={colorPalet.brandGradient}
        start={{x: -2, y: -2}}
        useAngle={true}
        angle={160}
        end={{x: 2, y: 2}}
        style={styles.grad_cont}>
        <View style={styles.content_cont}>
          <View>
            <Text style={styles.subtitle}>{subTitle}</Text>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.description} numberOfLines={3}>
              {description}
            </Text>
          </View>
          <Button
            text={t('read_more')}
            onPress={() => console.log('read more')}
            options={{color: 'white100', textColor: 'black100'}}
          />
        </View>
        <View style={{position: 'absolute', right: 0, bottom: 0}}>
          <Image source={require('../../../resources/images/img2.png')} />
          <View
            style={{
              width: 250,
              height: 250,
              borderRadius: 1000,
              position: 'absolute',
              right: -60,
              bottom: -100,
              backgroundColor: colorPalet.white20,
              zIndex: -1,
            }}
          />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default NewsCard;
