import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';

interface Iprops {
  type: 'online' | 'offline';
}

const OnlineOffline: React.FC<Iprops> = ({type}) => {
  const {t} = useTranslation();
  return (
    <LinearGradient
      colors={
        type === 'online' ? colorPalet.brandGradient : ['#c5c5c5', '#c5c5c5']
      }
      useAngle={true}
      angle={130}
      style={{
        paddingHorizontal: 10,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
      }}>
      <Text
        style={{
          fontSize: 12,
          fontFamily: fonts.sf_medium,
          color: colorPalet.white100,
        }}>
        {t(type)}
      </Text>
    </LinearGradient>
  );
};

export default OnlineOffline;
