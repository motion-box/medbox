import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, TouchableOpacity} from 'react-native';
import {ArrowIcon} from '../../../resources/icons/icons';
import {colorPalet} from '../../../resources/style/globalStyle';
import styles from './style';

interface Iprops {
  isModal: boolean;
  setModal: (type: 'pathology' | 'allergy') => void;
}
const UserFeatureButtons: React.FC<Iprops> = ({isModal, setModal}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => !isModal && setModal('pathology')}>
        <Text style={styles.button_text}>{t('pathology')}</Text>
        <ArrowIcon
          rotate="270"
          width="16"
          height="16"
          color={colorPalet.black50}
        />
      </TouchableOpacity>
      <View style={{height: 10}} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => !isModal && setModal('allergy')}>
        <Text style={styles.button_text}>{t('allergy')}</Text>
        <ArrowIcon
          rotate="270"
          width="16"
          height="16"
          color={colorPalet.black50}
        />
      </TouchableOpacity>
    </View>
  );
};

export default UserFeatureButtons;
