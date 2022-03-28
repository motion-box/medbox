import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
} from 'react-native';
import styles from './style';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '../../../hooks/redux';
import BottomSheetModal from '../../global_components/bottom_sheet_modal';
import Button from '../../global_components/button';
import {CloseCircleIcon} from '../../../resources/icons/icons';
import {colorPalet} from '../../../resources/style/globalStyle';
import Animated from 'react-native-reanimated';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Rater from './rater';
import {registerAPI} from '../../../services/RegisterService';
import LittlePreloader from '../../global_components/little_preloader';

interface Iprops {
  isVisible: boolean;
  setVisible: (state: boolean) => void;
  data: {
    id: number;
    full_name: string;
    image: string | undefined;
    speciality: string;
    isEstimate: boolean;
    consultationId: number;
  } | null;
}
//TODO: Rework modal for android
const ReviewModal: React.FC<Iprops> = props => {
  const {isVisible, setVisible, data} = props;
  const {t} = useTranslation();
  const {accessData} = useAppSelector(state => state.userReducer);
  const {screen, os} = useAppSelector(state => state.globalReducer);
  const inputRef = useRef<TextInput>(null);
  const [rate, setRate] = useState(0);
  const [text, setText] = useState('');
  const [reviewConsultation, {isLoading}] =
    registerAPI.useReviewConsultationMutation();

  useEffect(() => {
    if (inputRef) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, []);

  const hideModal = () => {
    setVisible(false);
  };

  const onSubmitPress = () => {
    if (!data) return;
    const body = data.isEstimate
      ? {
          consultation: data.consultationId,
          user: accessData!.id,
          doctor: data.id,
          rate: rate,
          comment: text,
        }
      : {
          consultation: data.consultationId,
          user: accessData!.id,
          doctor: data.id,
          text: text,
        };
    console.log(body);
    reviewConsultation({
      token: accessData!.token,
      type: data.isEstimate ? 'estimates' : 'complaints',
      body: {...body},
    })
      .unwrap()
      .then(res => {
        console.log(`${data.isEstimate ? 'estimates' : 'complaints'}`, res);
        hideModal();
      })
      .catch(e => console.log(e));
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      style={styles.modal_cont}>
      <View style={styles.backdrop}>
        <KeyboardAvoidingView
          behavior={os === 'ios' ? 'position' : undefined}
          style={{width: '100%', alignSelf: 'flex-end'}}>
          <View style={styles.container}>
            <View style={styles.title_cont}>
              <View style={styles.left_cont}>
                <Image
                  source={
                    data?.image
                      ? {uri: data.image}
                      : require('../../../resources/images/nurse2.png')
                  }
                  style={styles.image}
                />
                <View>
                  <Text style={styles.title}>{data?.full_name}</Text>
                  <Text style={styles.subtitle}>{data?.speciality}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={hideModal}>
                <CloseCircleIcon color={colorPalet.black100} />
              </TouchableOpacity>
            </View>
            <Text style={styles.head_text}>
              {data?.isEstimate ? t('how_would_you_rate') : t('your_complaint')}
            </Text>
            {data?.isEstimate ? (
              <Rater stars={rate} setStars={setRate} />
            ) : null}
            <View style={{height: 10}} />
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder={t('text_input_placeholder')}
              placeholderTextColor={colorPalet.black50}
              onChange={e => setText(e.nativeEvent.text)}
            />
            <View style={{height: 20}} />
            <View style={styles.bottom_cont}>
              <Button
                text={t('accept')}
                onPress={onSubmitPress}
                options={{
                  borderRadius: 10,
                  buttonHeight: 50,
                  buttonWidth: '100%',
                  textSize: 14,
                }}
              />
              {os === 'ios' ? <View style={{height: 10}} /> : null}
            </View>
            {isLoading && (
              <View style={styles.lodaer_cont}>
                <LittlePreloader />
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default ReviewModal;
