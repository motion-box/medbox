import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, TouchableOpacity} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {CircleIcon, CloseCircleIcon} from '../../../resources/icons/icons';
import {colorPalet} from '../../../resources/style/globalStyle';
import {globalSlice} from '../../../store/reducers/GlobalSlice';
import BottomSheetModal from '../../global_components/bottom_sheet_modal';
import Button from '../../global_components/button';
import styles from './style';

interface Iprops {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const LanguageBottomSheet: React.FC<Iprops> = props => {
  const {t, i18n} = useTranslation();
  const {isVisible, setVisible} = props;
  const {screen, lang} = useAppSelector(state => state.globalReducer);
  const dispatch = useAppDispatch();
  const {setAppLanguage} = globalSlice.actions;
  const [isModal, setModal] = useState(isVisible);
  const [selectedLang, setSelectedLang] = useState(lang as string);
  const data = [
    {key: 'en', name: 'English'},
    {key: 'ru', name: 'Русский'},
    {key: 'uz', name: "O'zbekcha"},
  ];

  const mapLanguages = data.map(item => {
    return (
      <React.Fragment key={item.key}>
        <TouchableOpacity
          style={styles.item_cont}
          activeOpacity={0.8}
          onPress={() => setSelectedLang(item.key)}>
          <View style={styles.radio_cont}>
            {selectedLang === item.key ? (
              <CircleIcon width="12" height="12" isGradient />
            ) : (
              <View style={styles.circle} />
            )}
          </View>
          <Text
            style={[
              styles.item_text,
              {
                color:
                  selectedLang === item.key
                    ? colorPalet.black100
                    : colorPalet.black50,
              },
            ]}>
            {item.name}
          </Text>
        </TouchableOpacity>
        <View style={styles.spacer} />
      </React.Fragment>
    );
  });

  const onSavePress = () => {
    hideModal();
    dispatch(setAppLanguage(selectedLang as 'ru' | 'uz' | 'en'));
    i18n.changeLanguage(selectedLang);
  };

  const hideModal = () => {
    setModal(false);
  };
  return (
    <BottomSheetModal
      isModal={isModal}
      isVisible={isVisible}
      setVisible={setVisible}>
      <View style={styles.container}>
        <View style={styles.head_cont}>
          <Text style={styles.titler}>{t('choose_language')}</Text>
          <TouchableOpacity onPress={hideModal}>
            <CloseCircleIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.spacer} />
        <View style={styles.spacer} />
        <View>{mapLanguages}</View>
        <View style={styles.spacer} />
        <Button
          text={t('save')}
          onPress={onSavePress}
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
export default LanguageBottomSheet;
