import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import BottomSheetModal from '../index';
import {useAppSelector} from '../../../../hooks/redux';
import {CircleIcon, CloseCircleIcon} from '../../../../resources/icons/icons';
import Button from '../../button';
import styles from './style';
import {useTranslation} from 'react-i18next';
import {SearchParams} from '../../../../services/DoctorService';
import {ScrollView} from 'react-native-gesture-handler';

interface Iprops {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  filterParams: SearchParams;
  setFilterParams: (data: SearchParams) => void;
  selectedOnlineOption: React.MutableRefObject<number>;
  selectedRatingOption: React.MutableRefObject<number>;
}

const SearchSettingsModal: React.FC<Iprops> = props => {
  const {t} = useTranslation();
  const {
    isVisible,
    setVisible,
    filterParams,
    setFilterParams,
    selectedOnlineOption,
    selectedRatingOption,
  } = props;
  const {screen} = useAppSelector(state => state.globalReducer);
  const [isModal, setModal] = useState(isVisible);

  const [onlineOptionId, setOnlineOptionId] = useState(
    selectedOnlineOption.current,
  );
  const [ratingOptionId, setRatingOptionId] = useState(
    selectedRatingOption.current,
  );

  const hideModal = () => {
    setModal(false);
  };

  const onSavePressed = () => {
    let params = {...filterParams};
    if (onlineOptionId === 0) {
      params.is_online = undefined;
    } else if (onlineOptionId === 1) {
      params.is_online = true;
    } else {
      params.is_online = false;
    }

    if (ratingOptionId === 0) {
      params.rating__gte = undefined;
      params.rating__lte = undefined;
    } else if (ratingOptionId === 1) {
      params.rating__gte = undefined;
      params.rating__lte = 5;
    } else {
      params.rating__gte = 0;
      params.rating__lte = undefined;
    }
    selectedOnlineOption.current = onlineOptionId;
    selectedRatingOption.current = ratingOptionId;
    setFilterParams({...params});
    hideModal();
  };

  const onlineOptions: OptionsInteface = {
    title: 'is_online',
    options: [
      {
        id: 0,
        text: 'not_selected',
        isActive: onlineOptionId === 0,
        onPress: () => setOnlineOptionId(0),
      },
      {
        id: 1,
        text: 'online',
        isActive: onlineOptionId === 1,
        onPress: () => setOnlineOptionId(1),
      },
      {
        id: 2,
        text: 'offline',
        isActive: onlineOptionId === 2,
        onPress: () => setOnlineOptionId(2),
      },
    ],
  };
  const ratingOptions: OptionsInteface = {
    title: 'rating',
    options: [
      {
        id: 0,
        text: 'not_selected',
        isActive: ratingOptionId === 0,
        onPress: () => setRatingOptionId(0),
      },
      {
        id: 1,
        text: 'search_settings_rating_high',
        isActive: ratingOptionId === 1,
        onPress: () => setRatingOptionId(1),
      },
      {
        id: 2,
        text: 'search_settings_rating_low',
        isActive: ratingOptionId === 2,
        onPress: () => setRatingOptionId(2),
      },
    ],
  };
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
        <ScrollView
          style={{height: screen.height / 1.5}}
          contentContainerStyle={{paddingBottom: 20}}>
          <OptionsContainer {...onlineOptions} />
          <View style={styles.spacer} />
          <OptionsContainer {...ratingOptions} />
        </ScrollView>
        <Button
          text={t('save')}
          onPress={onSavePressed}
          options={{
            buttonWidth: '100%',
            buttonHeight: 50,
            textSize: 14,
            borderRadius: 10,
          }}
        />
        {/* <View style={styles.spacer} /> */}
        {screen.hasNotch && <View style={styles.spacer} />}
      </View>
    </BottomSheetModal>
  );
};
interface OptionsInteface {
  title: string;
  options: {
    isActive: boolean;
    id: number;
    text: string;
    onPress: () => void;
  }[];
}
const OptionsContainer = ({title, options}: OptionsInteface) => {
  const {t} = useTranslation();
  const mapItems = options.map(item => {
    return (
      <TouchableOpacity
        style={styles.item_cont}
        key={item.id}
        onPress={item.onPress}>
        {item.isActive ? (
          <CircleIcon isGradient />
        ) : (
          <View style={[styles.circle]} />
        )}
        <Text style={styles.item_text}>{t(item.text)}</Text>
      </TouchableOpacity>
    );
  });
  return (
    <View>
      <Text style={styles.titler}>{t(title)}</Text>
      <View style={styles.spacer} />
      {mapItems}
    </View>
  );
};

export default SearchSettingsModal;
