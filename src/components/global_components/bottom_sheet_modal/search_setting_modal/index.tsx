import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import BottomSheetModal from '../index';
import {useAppSelector} from '../../../../hooks/redux';
import {CloseCircleIcon} from '../../../../resources/icons/icons';
import Button from '../../button';
import RadioSelector from '../../radio_selector';
import styles from './style';
import {useTranslation} from 'react-i18next';

interface Iprops {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchSettingsModal: React.FC<Iprops> = props => {
  const {t} = useTranslation();
  const {isVisible, setVisible} = props;
  const {screen} = useAppSelector(state => state.globalReducer);
  const [isModal, setModal] = useState(isVisible);

  const settingsData = [
    {
      id: 0,
      title: t('price'),
      names: [
        t('search_settings_price_expensive'),
        t('search_settings_price_cheep'),
      ],
    },
    {
      id: 1,
      title: t('rating'),
      names: [
        t('search_settings_rating_high'),
        t('search_settings_rating_low'),
      ],
    },
  ];

  const hideModal = () => {
    setModal(false);
  };

  const mapSetting = settingsData.map(item => {
    return (
      <View key={item.id}>
        <View style={styles.spacer} />
        <Text style={styles.titler}>{item.title}</Text>
        <View style={styles.spacer} />
        <RadioSelector
          bgColor="bgColor"
          data={item.names}
          onSelect={() => null}
        />
      </View>
    );
  });
  return (
    <BottomSheetModal
      isVisible={isVisible}
      setVisible={setVisible}
      isModal={isModal}>
      <View style={{padding: 20}}>
        <View style={styles.head_cont}>
          <Text style={styles.titler}>{t('search_settings_title')}</Text>
          <TouchableOpacity onPress={hideModal}>
            <CloseCircleIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.spacer} />
        {mapSetting}

        <View style={styles.spacer} />
        <View style={styles.spacer} />
        <Button
          text={t('save')}
          onPress={() => null}
          options={{
            buttonWidth: '100%',
            buttonHeight: 50,
            textSize: 14,
            borderRadius: 10,
          }}
        />
        <View style={styles.spacer} />
        {screen.hasNotch && <View style={styles.spacer} />}
      </View>
    </BottomSheetModal>
  );
};

export default SearchSettingsModal;
