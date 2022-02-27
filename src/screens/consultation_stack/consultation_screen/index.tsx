import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, SafeAreaView, Text} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import ConsultationCarousel from '../../../components/consultation_screens_components/consultation_carousel';
import FindButton from '../../../components/consultation_screens_components/find_button';
import {useAppSelector} from '../../../hooks/redux';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';
import StatusBarFocus from '../../../components/global_components/StatusBarCustom';
import {useFocusEffect} from '@react-navigation/native';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: {
    params: {};
  };
}

export default function ConsultationScreen({navigation}: ScreenProps) {
  const {screen} = useAppSelector(state => state.globalReducer);
  const [isButtonActive, setButtonActive] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', () => {
      setButtonActive(false);
    });
    return () => {
      navigation.removeListener('focus', () => null);
    };
  }, [navigation]);

  const onPress = () => {
    setButtonActive(true);
    setTimeout(() => {
      navigation.navigate('ConsultationStack');
    }, 200);
  };
  return (
    <>
      <StatusBarFocus
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <LinearGradient
        style={styles.container}
        colors={colorPalet.brandGradient}
        start={{x: 0.5, y: 0.5}}
        end={{x: 1, y: 1}}
        useAngle={true}
        angleCenter={{x: 0.5, y: 0.5}}
        angle={100}>
        <SafeAreaView
          style={{
            flex: 1,
            marginBottom: screen.hasNotch ? 113 : 100,
          }}>
          <ConsultationCarousel />
          <View style={styles.text_contaier}>
            <Text style={styles.title}>Alisa Miller</Text>
            <Text style={styles.description}>
              You can find the doctor you need and consult with him about your
              health problems
            </Text>
          </View>
          <FindButton onPress={onPress} isActive={isButtonActive} />
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalet.brandGreen,
  },
  text_contaier: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.sf_bold,
    color: colorPalet.white100,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    fontFamily: fonts.sf_medium,
    color: colorPalet.white100,
  },
});
