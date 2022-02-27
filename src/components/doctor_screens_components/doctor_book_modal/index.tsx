import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useAppSelector} from '../../../hooks/redux';
import {CloseCircleIcon} from '../../../resources/icons/icons';
import {colorPalet} from '../../../resources/style/globalStyle';
import BottomSheetModal from '../../global_components/bottom_sheet_modal';
import Button from '../../global_components/button';
import Slider from '../../global_components/slider';
import DoctorOrganizationPicker from '../doctor_organization_picker';
import DoctorTimePicker from '../doctor_time_picker';
import styles from './style';

interface Iprops {
  isVisible: boolean;
  setVisible: (state: boolean) => void;
}
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const DoctorBookModal: React.FC<Iprops> = props => {
  const {t} = useTranslation();
  const opacity = useSharedValue(0);
  const {screen} = useAppSelector(state => state.globalReducer);
  const {isVisible, setVisible} = props;
  const [isModal, setModal] = useState(isVisible);
  const sliderData = [
    {id: '0', text: t('online'), onPress: (id: string) => console.log(id)},
    {id: '1', text: t('offline'), onPress: (id: string) => console.log(id)},
  ];

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
      isVisible={isVisible}
      setVisible={setVisible}
      isModal={isModal}>
      <View style={styles.container}>
        <View style={styles.title_cont}>
          <Text style={styles.title}>{t('doctor_book')}</Text>
          <TouchableOpacity onPress={hideModal}>
            <CloseCircleIcon color={colorPalet.black100} />
          </TouchableOpacity>
        </View>
        <View style={{margin: 20}}>
          <Slider
            data={sliderData}
            options={{
              buttonHeight: 30,
              backgroundColor: 'bgColor',
              marginHorizontal: 0,
            }}
          />
        </View>
        <AnimatedLinearGradient
          pointerEvents={'none'}
          colors={['rgba(0,0,0,0.08)', 'rgba(0,0,0,0)']}
          style={[styles.grad, rStyle, {width: screen.width}]}
        />
        <ScrollView
          style={{height: screen.height - 200, zIndex: -1}}
          contentContainerStyle={{paddingBottom: 90}}
          scrollEventThrottle={100}
          onScroll={handleScroll}
          showsVerticalScrollIndicator={false}>
          <DoctorOrganizationPicker />
          <View style={{height: 5}} />
          <DoctorTimePicker />
        </ScrollView>
        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
          style={[
            {
              width: screen.width,
              height: 50,
              position: 'absolute',
              bottom: 0,
            },
          ]}
        />
        <View style={styles.bottom_cont}>
          <Button
            text={t('accept')}
            onPress={hideModal}
            options={{
              borderRadius: 10,
              buttonHeight: 50,
              buttonWidth: '100%',
              textSize: 14,
            }}
          />
        </View>
      </View>
    </BottomSheetModal>
  );
};
export default DoctorBookModal;
