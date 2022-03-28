import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {CircleIcon, CloseCircleIcon} from '../../../resources/icons/icons';
import {colorPalet} from '../../../resources/style/globalStyle';
import {globalSlice} from '../../../store/reducers/GlobalSlice';
import BottomSheetModal from '../../global_components/bottom_sheet_modal';
import styles from './style';
import {IdleType} from '../../../models/UserModal';
import EmptyEvent from '../../global_components/empty_event';

interface Iprops {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  type: 'pathology' | 'allergy';
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const UserFeatureBottomSheet: React.FC<Iprops> = props => {
  const {t, i18n} = useTranslation();
  const {isVisible, setVisible, type} = props;
  const {screen, lang} = useAppSelector(state => state.globalReducer);
  const {userData} = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch();
  const {setAppLanguage} = globalSlice.actions;
  const [isModal, setModal] = useState(isVisible);
  const opacity = useSharedValue(0);
  const [data, setData] = useState<Array<IdleType>>();

  useEffect(() => {
    if (type === 'allergy') {
      setData(userData?.allergies);
    } else {
      setData(userData?.pathologies);
    }
  }, []);

  const hideModal = () => {
    setModal(false);
  };

  const rStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  const handleScroll = (event: any) => {
    if (event.nativeEvent.contentOffset.y > 5) {
      !opacity.value && (opacity.value = withTiming(1));
    } else {
      opacity.value && (opacity.value = withTiming(0));
    }
  };

  return (
    <BottomSheetModal
      isModal={isModal}
      isVisible={isVisible}
      setVisible={setVisible}>
      <View
        style={[
          styles.container,
          {
            width: '100%',
            height: 500,
          },
        ]}>
        <View style={styles.head_cont}>
          <Text style={styles.titler}>{t(type)}</Text>
          <TouchableOpacity onPress={hideModal}>
            <CloseCircleIcon />
          </TouchableOpacity>
        </View>
        <View style={{height: 15}} />
        <AnimatedLinearGradient
          pointerEvents={'none'}
          colors={['rgba(0,0,0,0.08)', 'rgba(0,0,0,0)']}
          style={[styles.grad, rStyle, {width: screen.width}]}
        />
        {data?.length ? (
          <ScrollView
            style={{zIndex: -1}}
            contentContainerStyle={{paddingBottom: 33, paddingTop: 5}}
            scrollEventThrottle={100}
            onScroll={handleScroll}
            showsVerticalScrollIndicator={false}>
            {data.map(item => (
              <View style={styles.item} key={item.id}>
                <Text style={styles.item_text}>{item[`name_${lang}`]}</Text>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.empt}>
            <EmptyEvent text={t(`no_${type}`)} icon="DraftIcon" />
          </View>
        )}
      </View>
    </BottomSheetModal>
  );
};
export default UserFeatureBottomSheet;
