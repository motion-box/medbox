import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, Image} from 'react-native';
import {useAppSelector} from '../../../hooks/redux';
import styles from './style';

const FamilySoon = () => {
  const {t} = useTranslation();
  const {screen} = useAppSelector(state => state.globalReducer);
  return (
    <View style={styles.container}>
      <Image
        style={[
          styles.image,
          {
            height: (screen.width - 40) / 2.14,
          },
        ]}
        resizeMode={'cover'}
        source={require('../../../resources/images/family_soon.jpg')}
      />
      <View style={styles.text_cont}>
        <View>
          <Text style={styles.title}>{t('family_soon_title')}</Text>
          <Text style={styles.subtitle}>{t('family_soon_subtitle')}</Text>
        </View>
        <Text style={styles.soon}>{t('family_soon_soon')}</Text>
      </View>
    </View>
  );
};

export default FamilySoon;
