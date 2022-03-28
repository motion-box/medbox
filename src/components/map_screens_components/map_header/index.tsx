import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import {ArrowIcon} from '../../../resources/icons/icons';
import {useAppSelector} from '../../../hooks/redux';
import {useTranslation} from 'react-i18next';

interface Iprops {
  text?: string;
  onBackPress: () => void;
}

const MapHeader: React.FC<Iprops> = props => {
  const {text, onBackPress} = props;
  const {t} = useTranslation();
  const {screen} = useAppSelector(state => state.globalReducer);

  return (
    <View
      style={[
        styles.header_cont,
        {
          top: screen.hasNotch ? 64 : screen.headerSize || 20 + 0,
        },
      ]}
      pointerEvents="box-none">
      <TouchableOpacity
        style={styles.header_button}
        activeOpacity={0.8}
        onPress={onBackPress}>
        <ArrowIcon rotate="90" />
      </TouchableOpacity>
      <View pointerEvents="none" style={{flex: 1}}>
        <Text style={styles.header_text} numberOfLines={1} ellipsizeMode="tail">
          {text || t('show_address')}
        </Text>
      </View>
      <View style={{width: 50, height: 50}} pointerEvents="none" />
    </View>
  );
};
export default MapHeader;
