import React from 'react';
import {View, Text, Image, Alert} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';

interface Iprops {}

const OneidBox: React.FC<Iprops> = props => {
  const {t} = useTranslation();
  const {} = props;
  return (
    <View style={styles.container}>
      <View style={styles.text_cont}>
        <LinearGradient
          style={{height: 1, flex: 1}}
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
          useAngle
          angle={90}
        />
        <Text style={styles.text}>{t('or_continue_with')}</Text>
        <LinearGradient
          style={{height: 1, flex: 1}}
          colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0)']}
          useAngle
          angle={90}
          angleCenter={{x: 0.6, y: 1}}
        />
      </View>
      <View style={styles.image_cont}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => Alert.alert('Need oneID integration')}
          style={styles.image}>
          <Image source={require('../../../resources/images/oneid.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OneidBox;
