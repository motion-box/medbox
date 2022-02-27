import React, {useState} from 'react';
import {Text, View} from 'react-native';
import styles from './style';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import WrapperGradient from '../../../components/welcome_screens_components/wrapper_gradient';
import Slider from '../../../components/global_components/slider';
import Button from '../../../components/global_components/button';
import {WelcomeScreensType} from '../../../navigation/WelcomeNavigator';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {globalSlice} from '../../../store/reducers/GlobalSlice';
import moment from 'moment';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: {
    params: {};
  };
}

type langTypes = 'en' | 'ru' | 'uz';

const LanguageScreen = ({navigation}: ScreenProps) => {
  const {t, i18n} = useTranslation();
  const [lang, setLang] = useState<langTypes>('en');
  const dispatch = useAppDispatch();
  const {setAppLanguage} = globalSlice.actions;
  const {screen} = useAppSelector(state => state.globalReducer);

  const data = [
    {id: '0', text: 'English', onPress: () => changeLang('en')},
    {id: '1', text: 'Русский', onPress: () => changeLang('ru')},
    {id: '2', text: 'Uzbek tili', onPress: () => changeLang('uz')},
  ];

  const changeLang = (language: langTypes) => {
    setLang(language);
    i18n.changeLanguage(language);
  };

  const goNext = () => {
    dispatch(setAppLanguage(lang));
    if (lang === 'uz') {
      moment.locale('uz-latn');
    } else {
      moment.locale(lang);
    }
    navigation.navigate(WelcomeScreensType.welcomeScreen);
  };
  return (
    <WrapperGradient>
      <View style={styles.container}>
        <Text style={styles.title}>{t('choose_language')}</Text>
        <Slider data={data} options={{backgroundColor: 'white80'}} />
      </View>
      <View
        style={{marginHorizontal: 20, marginBottom: screen.hasNotch ? 44 : 20}}>
        <Button
          text={t('select')}
          onPress={goNext}
          options={{
            buttonWidth: '100%',
            buttonHeight: 50,
            textSize: 14,
            borderRadius: 10,
          }}
        />
      </View>
    </WrapperGradient>
  );
};

export default LanguageScreen;
